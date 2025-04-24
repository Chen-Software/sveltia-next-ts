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
# Amend commits by stripping any previous issue lines and appending the new one
git filter-branch --force --msg-filter "sed '/^- Issue: https:\/\//d'; echo '- Issue: ${ISSUE_URL}'" "${BASE_SHA}..HEAD"

# --- Restore stashed changes if needed ---
if [ "$CHANGES_STASHED" = true ]; then
  echo "Restoring stashed changes..."
  git stash pop
fi

echo "Commit messages amended successfully."
