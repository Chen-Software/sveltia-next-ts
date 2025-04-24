#!/bin/bash
set -euo pipefail

# --- Safety Checks ---
if [ -z "${ISSUE_URL:-}" ]; then
  echo "::error::ISSUE_URL is required."
  exit 1
fi
if [ -z "${BASE_SHA:-}" ]; then
  echo "::error::BASE_SHA is required."
  exit 1
fi

# --- Check for and handle unstaged changes ---
echo "Checking for unstaged changes..."
if ! git diff --quiet; then
  echo "Unstaged changes detected. Stashing changes before proceeding..."
  git stash save "Temporary stash before filter-branch operation"
  CHANGES_STASHED=true
else
  echo "Working directory is clean."
  CHANGES_STASHED=false
fi

# --- Filter Logic --- 
# Create a temporary script file for the filter logic
# RADICLE_SITES and RADICLE_URLS as JSON arrays for multi-site support
RADICLE_SITES=${RADICLE_SITES:-'["git.chen.so", "code.chen.so", "git.chen.software", "code.chen.software"]'}
RADICLE_URLS=${RADICLE_URLS:-'["https://git.chen.so", "https://code.chen.so", "https://git.chen.software", "https://code.chen.software"]'}

# Determine primary site and URL for legacy compatibility
if [ ! -z "$RADICLE_SITES" ]; then
  readarray -t SITES < <(echo "$RADICLE_SITES" | jq -r '.[]')
  RADICLE_SITE="${SITES[0]}"
fi

# Create temporary filter script
TEMP_SCRIPT=$(mktemp)
trap 'rm -f "$TEMP_SCRIPT"' EXIT

cat > "$TEMP_SCRIPT" << EOF
#!/usr/bin/env bash
# Remove any existing issue references
sed '/^- Issue: https:\/\/[^/]\+\//d'
# Add the new issue reference
echo "- Issue: $ISSUE_URL"
EOF

# Make the filter script executable
chmod +x "$TEMP_SCRIPT"

# --- Execute filter-branch ---
echo "Amending commits from $BASE_SHA..HEAD with Issue URL: $ISSUE_URL"
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --msg-filter "$TEMP_SCRIPT" "${BASE_SHA}..HEAD"

# --- Restore stashed changes if needed ---
if [ "$CHANGES_STASHED" = true ]; then
  echo "Restoring stashed changes..."
  git stash pop
fi

echo "Commit messages amended successfully."
