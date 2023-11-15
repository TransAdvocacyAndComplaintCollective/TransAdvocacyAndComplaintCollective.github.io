#!/bin/bash

# Specify the top_directory where your files are located
top_directory="/home/william/Code/newPPUK/src"

# Rename files by replacing spaces with underscores in the specified directory and its subdirectories
# Find all files in the directory and its subdirectories
find "$top_directory" -type f -name "*" -print0 | while IFS= read -r -d $'\0' file; do
  # Extract the directory and filename from the full file path
  dir=$(dirname "$file")
  filename=$(basename "$file")

  # Rename the file by replacing spaces with underscores
  new_name=$(echo "$filename" | tr ' ' '_')
  new_path="$dir/$new_name"

  # Check if the new name is different from the current name
  if [ "$file" != "$new_path" ]; then
    mv "$file" "$new_path"
    echo "Renamed: $file -> $new_path"
  fi
done


# Find all Markdown files in the directory and its subdirectories
find "$top_directory" -type f -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
  # Extract the directory and filename from the full file path
  dir=$(dirname "$file")
  filename=$(basename "$file")

  # Rename the file by replacing spaces with underscores
  new_name=$(echo "$filename" | tr ' ' '_')
  new_path="$dir/$new_name"

  # Check if the new name is different from the current name
  if [ "$file" != "$new_path" ]; then
    mv "$file" "$new_path"
    echo "Renamed: $file -> $new_path"
  fi

  # Format links in the Markdown file
  sed -i 's/]\(([^)]*)\)/]('"$new_name"')/g' "$new_path"
done

# Find all files and folders in the directory and its subdirectories
find "$top_directory" -depth -print0 | while IFS= read -r -d $'\0' entry; do
  # Extract the directory and filename/foldername from the full path
  dir=$(dirname "$entry")
  name=$(basename "$entry")

  # Rename the file or folder by replacing spaces with underscores
  new_name=$(echo "$name" | tr ' ' '_')
  new_path="$dir/$new_name"

  # Check if the new name is different from the current name
  if [ "$entry" != "$new_path" ]; then
    mv "$entry" "$new_path"
    echo "Renamed: $entry -> $new_path"
  fi

  # Update links in Markdown files
  if [ -f "$new_path" ] && [[ "$new_path" == *.md ]]; then
    sed -i 's/]\(([^)]*)\)/]('"$new_name"')/g' "$new_path"
  fi
done