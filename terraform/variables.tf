variable "aws_region" {
  description = "AWS region to deploy the static site into."
  type        = string
  # No region was specified for the POLYSVIT_EU account, so this defaults to
  # Frankfurt (closest AWS region to Szczecin, Poland). Override with
  # -var="aws_region=..." or in terraform.tfvars if a different region is needed.
  default = "eu-central-1"
}

variable "aws_account_id" {
  description = "AWS account ID this stack must be deployed into (safety guard)."
  type        = string
  default     = "780770254140" # PIKA_NOWA (target account as of the last change)
}

variable "aws_profile" {
  description = "Named AWS CLI profile to use for authentication. Leave empty to fall back to the default credential chain (AWS_PROFILE env var, env access keys, instance role, etc.)."
  type        = string
  default     = "PIKA_NOWA"
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name for the site. Defaults to a name derived from the account ID to guarantee uniqueness."
  type        = string
  default     = ""
}

variable "environment" {
  description = "Tag applied to all resources."
  type        = string
  default     = "production"
}

variable "site_dist_dir" {
  description = "Path to the built static site (Vite `npm run build` output) that gets uploaded to S3."
  type        = string
  default     = "../dist"
}
