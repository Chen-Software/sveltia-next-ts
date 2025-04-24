#!/bin/bash

# --- Environment Variables ---
RADICLE_URL=${RADICLE_URL:-https://git.chen.so}
RADICLE_SITE=${RADICLE_SITE:-git.chen.so}

# --- Input Validation ---
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ] || [ -z "$5" ]; then
  echo "::error::Usage: $0 <total_commits> <issue_commits> <repo_name> <pr_total_commits> <pr_issue_commits>" >&2
  exit 1
fi

total_commits=$1
issue_commits=$2
repo_name=$3
pr_total_commits=$4
pr_issue_commits=$5

# --- Calculation ---
percentage=$(awk -v ic="$issue_commits" -v tc="$total_commits" 'BEGIN { if (tc > 0) { printf "%.2f", (ic/tc)*100 } else { print "0.00" } }')
pr_percentage=$(awk -v ic="$pr_issue_commits" -v tc="$pr_total_commits" 'BEGIN { if (tc > 0) { printf "%.2f", (ic/tc)*100 } else { print "0.00" } }')

# --- Determine Badge Color ---
if (( $(echo "$percentage >= 90" | bc -l) )); then
  color="4c1" # bright green
elif (( $(echo "$percentage >= 75" | bc -l) )); then
  color="97CA00" # green
elif (( $(echo "$percentage >= 50" | bc -l) )); then
  color="dfb317" # yellow
elif (( $(echo "$percentage >= 25" | bc -l) )); then
  color="fe7d37" # orange
else
  color="e05d44" # red
fi

# --- Construct Badge URL ---
badge_url="https://img.shields.io/badge/issues-${percentage}%25-${color}"

# --- Generate Report Output --- 
# Print the multi-line report to standard output. GitHub Actions will capture this.
cat << EOM
# Issue Traceability Report 

![Issue Traceability](${badge_url})

Total commits: $issue_commits out of $total_commits commits ($percentage%) reference an [issue](${RADICLE_URL}/${repo_name}/issues).
- Current PR commits: $pr_issue_commits out of $pr_total_commits commits ($pr_percentage%) reference an [issue](${RADICLE_URL}/${repo_name}/issues).
EOM
