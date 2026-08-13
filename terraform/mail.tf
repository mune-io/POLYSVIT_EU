# Contact-form backend: a private S3 bucket holding mail.txt, and a Lambda
# behind a public Function URL that appends each form submission to it.
#
# Kept deliberately separate from the site bucket (aws_s3_bucket.site in
# main.tf), which has a public-read bucket policy — mail.txt must never live
# there, or every visitor's name/email/message would be publicly downloadable
# at a guessable URL.

# ---------- Private storage for submissions ----------

resource "aws_s3_bucket" "mail" {
  bucket        = "${local.bucket_name}-mail"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "mail" {
  bucket = aws_s3_bucket.mail.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Versioning as a safety net: the Lambda does a read-modify-write on
# mail.txt, so two near-simultaneous submissions could in theory race and
# clobber each other. Versioning means nothing is ever truly lost — prior
# versions stay recoverable (`aws s3api list-object-versions`).
resource "aws_s3_bucket_versioning" "mail" {
  bucket = aws_s3_bucket.mail.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ---------- Lambda: append-to-mail.txt ----------

data "archive_file" "contact_form" {
  type        = "zip"
  source_file = "${path.module}/lambda/contact-form.mjs"
  output_path = "${path.module}/lambda/contact-form.zip"
}

resource "aws_iam_role" "contact_form" {
  name = "${local.bucket_name}-contact-form"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "contact_form_logs" {
  role       = aws_iam_role.contact_form.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "contact_form_s3" {
  name = "mail-object-rw"
  role = aws_iam_role.contact_form.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:PutObject"]
        Resource = "${aws_s3_bucket.mail.arn}/${var.mail_object_key}"
      },
      {
        # Without ListBucket, S3 can't tell this role apart from someone
        # probing for the key's existence, so GetObject on a not-yet-created
        # mail.txt returns 403 AccessDenied instead of 404 NoSuchKey — the
        # Lambda code only handles the latter. This is a background
        # existence check, not a real ListObjects call, so an s3:prefix
        # condition doesn't get evaluated against it and silently never
        # matches — has to be an unconditional allow on the bucket.
        # GetObject/PutObject above stay scoped to the single object key,
        # so the practical exposure is just "can list object keys in this
        # bucket", not read/write.
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.mail.arn
      },
    ]
  })
}

resource "aws_lambda_function" "contact_form" {
  function_name    = "${local.bucket_name}-contact-form"
  role             = aws_iam_role.contact_form.arn
  handler          = "contact-form.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.contact_form.output_path
  source_code_hash = data.archive_file.contact_form.output_base64sha256
  timeout          = 10
  memory_size      = 128

  environment {
    variables = {
      MAIL_BUCKET    = aws_s3_bucket.mail.id
      MAIL_KEY       = var.mail_object_key
      ALLOWED_ORIGIN = "http://${aws_s3_bucket_website_configuration.site.website_endpoint}"
    }
  }
}


# NOTE: this originally used a plain public Lambda Function URL
# (authorization_type = "NONE" + a "*"-principal resource policy). That's
# the simpler setup, but this AWS Organizations account consistently 403s
# anonymous Function URL invocations ("Forbidden. For troubleshooting
# Function URL authorization issues...") even with a verified-correct
# resource policy — almost certainly an org-level guardrail specifically
# targeting public (AuthType=NONE) Function URLs (a common Control
# Tower/Landing Zone baseline). This account's IAM user can't read
# Organizations SCPs/RCPs to confirm (organizations:ListPolicies is
# denied), so routing through API Gateway instead: the Lambda's caller
# becomes the apigateway.amazonaws.com service principal rather than an
# anonymous internet caller, which sidesteps that specific guardrail while
# the endpoint is still public/unauthenticated from the browser's point of
# view.

resource "aws_apigatewayv2_api" "contact_form" {
  name          = "${local.bucket_name}-contact-form"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["http://${aws_s3_bucket_website_configuration.site.website_endpoint}"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_integration" "contact_form" {
  api_id                 = aws_apigatewayv2_api.contact_form.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact_form" {
  api_id    = aws_apigatewayv2_api.contact_form.id
  route_key = "POST /"
  target    = "integrations/${aws_apigatewayv2_integration.contact_form.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact_form.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_form.execution_arn}/*/*"
}

# ---------- Wire the frontend to the (only-known-after-apply) API endpoint ----------

resource "aws_s3_object" "runtime_config" {
  bucket       = aws_s3_bucket.site.id
  key          = "config.json"
  content_type = "application/json"
  content = jsonencode({
    contactEndpoint = aws_apigatewayv2_stage.default.invoke_url
  })

  depends_on = [aws_s3_bucket_policy.public_read]
}
