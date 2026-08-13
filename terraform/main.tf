locals {
  bucket_name = var.bucket_name != "" ? var.bucket_name : "polysvit-eu-${var.aws_account_id}"

  mime_types = {
    ".html"  = "text/html"
    ".css"   = "text/css"
    ".js"    = "application/javascript"
    ".mjs"   = "application/javascript"
    ".json"  = "application/json"
    ".svg"   = "image/svg+xml"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".ico"   = "image/x-icon"
    ".webp"  = "image/webp"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".txt"   = "text/plain"
    ".map"   = "application/json"
  }

  site_files = fileset(var.site_dist_dir, "**")
}

resource "aws_s3_bucket" "site" {
  bucket        = local.bucket_name
  force_destroy = true # allows `terraform destroy` to remove a non-empty bucket

  lifecycle {
    precondition {
      condition     = length(fileset(var.site_dist_dir, "**")) > 0
      error_message = "No files found in ${var.site_dist_dir}. Run `npm run build` in the project root before `terraform apply`."
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  index_document {
    suffix = "index.html"
  }

  # Single-page landing (no client-side router) — fall back to the same
  # index.html so anchor links (#contact, #products, ...) keep working.
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.public_read.json

  depends_on = [aws_s3_bucket_public_access_block.site]
}

data "aws_iam_policy_document" "public_read" {
  statement {
    sid       = "PublicReadGetObject"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

# Uploads every file from the Vite build output (`npm run build`) into the
# bucket, keyed by relative path, with a content-based hash so files only
# get re-uploaded when their contents change.
resource "aws_s3_object" "site_files" {
  for_each = local.site_files

  bucket       = aws_s3_bucket.site.id
  key          = each.value
  source       = "${var.site_dist_dir}/${each.value}"
  etag         = filemd5("${var.site_dist_dir}/${each.value}")
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), "application/octet-stream")

  depends_on = [aws_s3_bucket_policy.public_read]
}
