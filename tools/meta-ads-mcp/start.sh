#!/bin/zsh

set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h:h}"
ENV_FILE="$PROJECT_ROOT/.env.local"
KEYCHAIN_SERVICE="healingsoil-meta-ads-mcp"
KEYCHAIN_ACCOUNT="healingsoil"

META_ADS_ACCESS_TOKEN="${META_ADS_ACCESS_TOKEN:-}"

# Read only this key instead of sourcing .env.local, which could execute shell
# syntax. Quoted values are supported; blank placeholders fall through to
# Keychain.
if [[ -z "$META_ADS_ACCESS_TOKEN" && -f "$ENV_FILE" ]]; then
  while IFS= read -r env_line; do
    if [[ "$env_line" == META_ADS_ACCESS_TOKEN=* ]]; then
      META_ADS_ACCESS_TOKEN="${env_line#META_ADS_ACCESS_TOKEN=}"
      META_ADS_ACCESS_TOKEN="${META_ADS_ACCESS_TOKEN#\"}"
      META_ADS_ACCESS_TOKEN="${META_ADS_ACCESS_TOKEN%\"}"
      META_ADS_ACCESS_TOKEN="${META_ADS_ACCESS_TOKEN#\'}"
      META_ADS_ACCESS_TOKEN="${META_ADS_ACCESS_TOKEN%\'}"
      break
    fi
  done < "$ENV_FILE"
fi

if [[ -z "$META_ADS_ACCESS_TOKEN" ]]; then
  META_ADS_ACCESS_TOKEN="$(
    security find-generic-password \
      -a "$KEYCHAIN_ACCOUNT" \
      -s "$KEYCHAIN_SERVICE" \
      -w 2>/dev/null
  )" || {
    print -u2 "Meta Ads token is missing from .env.local and macOS Keychain."
    print -u2 "Add META_ADS_ACCESS_TOKEN to .env.local or store it in Keychain."
    exit 1
  }
fi

if [[ -z "$META_ADS_ACCESS_TOKEN" ]]; then
  print -u2 "Meta Ads token in macOS Keychain is empty."
  exit 1
fi

export META_ADS_ACCESS_TOKEN
# Read-only by default. A one-off maintenance process may opt in explicitly;
# the registered Codex MCP does not set this variable and remains read-only.
export META_ADS_ENABLE_WRITE_TOOLS="${META_ADS_ENABLE_WRITE_TOOLS:-false}"

exec "$SCRIPT_DIR/node_modules/.bin/meta-ads-mcp"
