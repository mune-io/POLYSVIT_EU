terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Local state by default. For a shared/production setup, switch this to a
  # remote backend (S3 + DynamoDB lock table) before running `terraform init`.
  # backend "s3" {
  #   bucket         = "polysvit-eu-terraform-state"
  #   key            = "landing/terraform.tfstate"
  #   region         = "eu-central-1"
  #   dynamodb_table = "polysvit-eu-terraform-locks"
  #   encrypt        = true
  # }
}
