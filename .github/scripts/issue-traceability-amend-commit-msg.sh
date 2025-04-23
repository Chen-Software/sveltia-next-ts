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
# We still use a heredoc here, but it's within a .sh file, not directly in YAML.
cat > /tmp/msg-filter.sh << 'EOF'
#!/bin/bash
# Read the original commit message
current_msg=$(cat)
# Get the issue URL from environment (it was exported before calling filter-branch)
issue_url="$ISSUE_URL"
# Define the exact issue line to add
issue_line_to_add="- Issue: $issue_url"

# Check if any reference to this specific issue URL already exists
if echo "$current_msg" | grep -qF "$issue_url"; then
  # Issue URL already exists, keep message unchanged
  echo "$current_msg"
else
  # URL doesn't exist, append our standardized format
  echo "$current_msg"
  echo ""
  echo "$issue_line_to_add"
fi
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
