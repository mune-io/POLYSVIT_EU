provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile != "" ? var.aws_profile : null

  # Hard guard: refuses to apply if the resolved credentials point at a
  # different AWS account than POLYSVIT_EU (267965637906).
  allowed_account_ids = [var.aws_account_id]

  default_tags {
    tags = {
      Project     = "polysvit-eu-landing"
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}
