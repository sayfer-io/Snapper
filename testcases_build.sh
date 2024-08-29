#!/bin/bash

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install jq to proceed."
    exit 1
fi

# Ensure the testcases directory exists
mkdir -p testcases

# Read and parse the JSON file for categories
categories=$(jq -r 'keys[]' findings/findings_categorized.json)

# Iterate over each category
echo "$categories" | while IFS= read -r category; do
    # Trim any leading or trailing whitespace from category
    category=$(echo "$category" | xargs)
    category_dir="testcases/$category"
    
    # Create the category directory if it doesn't exist
    mkdir -p "$category_dir"
    
    # Read and parse the JSON file for findings within the category
    findings=$(jq -r --arg category "$category" '.[$category][]["code_urls"][] // empty' findings/findings_categorized.json)
    
    # Check if findings is not null or empty
    if [ -z "$findings" ]; then
        echo "No findings for category $category. Skipping."
        continue
    fi
    
    # Iterate over each finding within the category
    echo "$findings" | while IFS= read -r url; do
        # Trim any leading or trailing whitespace from url
        url=$(echo "$url" | xargs)
        
        # Extract the base repository URL and optional branch/commit hash
        base_url=$(echo "$url" | sed -E 's|/tree/.*||')
        branch_or_commit=$(echo "$url" | sed -n 's|.*tree/\([^/]*\).*|\1|p')
        
        # Extract the repository name from the base URL
        repo_name=$(basename -s .git "$base_url")
        repo_dir="$category_dir/$repo_name"
        
        # Check if the directory already exists and is not empty
        if [ -d "$repo_dir" ] && [ "$(ls -A "$repo_dir")" ]; then
            echo "Directory $repo_dir already exists and is not empty. Skipping clone."
            continue
        fi
        
        echo "Cloning repository $base_url into $repo_dir"
        # Clone the repository with depth 1 into the category folder
        if ! git clone --depth 1 "$base_url" "$repo_dir"; then
            echo "Failed to clone repository $base_url. Skipping."
            continue
        fi
        
        # If a branch or commit hash is specified, checkout to that branch or commit
        if [ -n "$branch_or_commit" ]; then
            cd "$repo_dir" || exit
            git fetch --depth 1 origin "$branch_or_commit"
            git checkout "$branch_or_commit"
            cd - || exit
        fi
    done
done