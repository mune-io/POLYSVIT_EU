#!/usr/bin/env bash
# Sets AWS_PROFILE and verifies the resolved credentials point at the
# expected account before you run any aws/terraform commands.
#
# Usage:
#   source terraform/check-account.sh   # (source it, so AWS_PROFILE stays exported in your shell)
# or just:
#   ./terraform/check-account.sh        # exits non-zero on failure, safe to use in CI

set -u

EXPECTED_ACCOUNT="780770254140" # PIKA_NOWA — must match terraform/variables.tf: aws_account_id

export AWS_PROFILE="PIKA_NOWA"

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

# Corporate AV/proxy HTTPS-interception workaround (equivalent of the Avast
# wscert.pem check on Windows). Most Linux setups don't need this — but if
# your AV/proxy injects its own root CA, point AWS_CA_BUNDLE at it here.
CUSTOM_CA_BUNDLE="${AWS_CA_BUNDLE:-/etc/ssl/certs/custom-ca-bundle.pem}"
if [ -f "$CUSTOM_CA_BUNDLE" ]; then
    export AWS_CA_BUNDLE="$CUSTOM_CA_BUNDLE"
    echo -e "${CYAN}AWS_CA_BUNDLE = $AWS_CA_BUNDLE (HTTPS interception workaround)${NC}"
else
    echo -e "${YELLOW}No custom CA bundle found at $CUSTOM_CA_BUNDLE — skipping (fine on most Linux setups; if aws commands fail with an SSL error, that's likely why).${NC}"
fi

echo -e "${CYAN}AWS_PROFILE = $AWS_PROFILE${NC}"

IDENTITY_JSON=$(aws sts get-caller-identity --output json 2>&1)
STATUS=$?

if [ $STATUS -ne 0 ] || [ -z "$IDENTITY_JSON" ]; then
    echo -e "${RED}aws sts get-caller-identity failed - check credentials/network before running anything else.${NC}" >&2
    echo "$IDENTITY_JSON" >&2
    return 1 2>/dev/null || exit 1
fi

ACCOUNT=$(echo "$IDENTITY_JSON" | jq -r '.Account')
ARN=$(echo "$IDENTITY_JSON" | jq -r '.Arn')

echo -e "${CYAN}Account: $ACCOUNT${NC}"
echo -e "${CYAN}Arn:     $ARN${NC}"

if [ "$ACCOUNT" != "$EXPECTED_ACCOUNT" ]; then
    echo -e "${YELLOW}Warning: expected account $EXPECTED_ACCOUNT (terraform/variables.tf: aws_account_id) - got $ACCOUNT instead. STOP and check before running AWS commands.${NC}" >&2
    return 1 2>/dev/null || exit 1
else
    echo -e "${GREEN}Account OK.${NC}"
fi
