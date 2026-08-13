output "bucket_name" {
  description = "Name of the S3 bucket hosting the site."
  value       = aws_s3_bucket.site.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket."
  value       = aws_s3_bucket.site.arn
}

output "website_endpoint" {
  description = "Public S3 static-website URL (plain HTTP, no custom domain/HTTPS)."
  value       = "http://${aws_s3_bucket_website_configuration.site.website_endpoint}"
}

output "website_domain" {
  description = "S3 website domain, useful as the origin/target for a future CloudFront distribution or DNS record."
  value       = aws_s3_bucket_website_configuration.site.website_domain
}

output "mail_bucket" {
  description = "Private S3 bucket holding mail.txt (contact-form submissions)."
  value       = aws_s3_bucket.mail.id
}

output "contact_form_endpoint" {
  description = "Public API Gateway endpoint the contact form POSTs to."
  value       = aws_apigatewayv2_stage.default.invoke_url
}
