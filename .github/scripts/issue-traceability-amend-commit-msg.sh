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

# --- Create temporary directory for filter script ---
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# --- Filter Logic --- 
# Create a temporary script to filter commit messages
cat > "$TEMP_DIR/filter_script.sh" << 'EOF'
#!/bin/bash
# Read the commit message from stdin
cat > "$TEMP_DIR/msg"

# Remove any existing issue references and separator
sed -i '/^---$/,$d' "$TEMP_DIR/msg"
# Remove any trailing whitespace
sed -i '${/^[[:space:]]*$/d}' "$TEMP_DIR/msg"

# Add the new issue reference with proper formatting
echo -e "\n---\n\n- Issue: $ISSUE_URL" >> "$TEMP_DIR/msg"

# Output the modified message
cat "$TEMP_DIR/msg"
EOF

# Make the filter script executable
chmod +x "$TEMP_DIR/filter_script.sh"

# --- Apply the filter script to each commit ---
export ISSUE_URL TEMP_DIR
git filter-branch --force --msg-filter "$TEMP_DIR/filter_script.sh" "${BASE_SHA}..HEAD"

# --- Restore stashed changes if needed ---
if [ "$CHANGES_STASHED" = true ]; then
  echo "Restoring stashed changes..."
  git stash pop
fi

echo "Commit messages amended successfully."
