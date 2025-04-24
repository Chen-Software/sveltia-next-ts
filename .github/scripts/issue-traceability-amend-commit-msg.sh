#!/bin/bash

# --- Safety Checks ---
if [ -z "$ISSUE_URL" ]; then
  echo "::error::ISSUE_URL is required."
  exit 1
fi
if [ -z "$BASE_SHA" ]; then
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
export RADICLE_SITE=${RADICLE_SITE:-git.chen.so}

cat > /tmp/msg-filter.sh << EOF
#!/bin/bash
# Filter commit messages: remove all existing Radicle issue references
sed "/^- Issue: https:\/\/$RADICLE_SITE\//d" | sed -e ':a' -e '/^\n*$/{$d;N;};/\n$/ba'
# Append a single standardized issue line
echo "- Issue: $ISSUE_URL"
EOF

# Make the filter script executable
chmod +x /tmp/msg-filter.sh

# Export the URL so it's available to the inner filter script
export ISSUE_URL

# --- Execute filter-branch ---
echo "Amending commits from $BASE_SHA..HEAD with Issue URL: $ISSUE_URL"
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --msg-filter "/tmp/msg-filter.sh" "${BASE_SHA}..HEAD"

# Check if filter-branch executed successfully
FILTER_RESULT=$?

# --- Restore stashed changes if needed ---
if [ "$CHANGES_STASHED" = true ]; then
  echo "Restoring stashed changes..."
  git stash pop
fi

# Now check the filter result
if [ $FILTER_RESULT -ne 0 ]; then
  echo "::error::git filter-branch command failed."
  exit 1
fi

echo "Commit messages amended successfully."
