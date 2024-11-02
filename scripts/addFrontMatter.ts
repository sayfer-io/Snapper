import * as fs from 'fs';
import * as path from 'path';

// Update the path to the `docs` directory to be relative to the project root
const docsPath = path.join(__dirname, '..', 'docs');
const configFilePath = path.join(docsPath, '_config.yml');

// Helper function to format title by replacing underscores or hyphens with spaces
function formatTitle(title: string): string {
  return title.replace(/[-_]/g, ' ').replace(/\.md$/, '').replace(/\.ts$/, '');
}

// Function to add front matter to a file if it doesn’t already have it
function addFrontMatter(filePath: string, title: string, parentTitle?: string, hasChildren: boolean = false): void {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if front matter already exists to avoid duplication
  if (content.startsWith('---')) {
    console.log(`Front matter already exists for ${filePath}, skipping.`);
    return;
  }

  // Create the front matter based on parameters
  const frontMatter = `---
layout: default
title: "${title}"
${parentTitle && parentTitle !== 'docs' ? `parent: "${parentTitle}"` : ""}
${hasChildren ? `has_children: true` : ""}
---\n`;

  // Write the new content with front matter to the file
  fs.writeFileSync(filePath, frontMatter + content, 'utf8');
}

// Recursive function to process directories and add appropriate front matter
function processDirectory(dir: string, parentTitle?: string): void {
  const files = fs.readdirSync(dir);

  // Determine the current directory's title based on its name
  const currentTitle = formatTitle(path.basename(dir));

  // Path for the index.md file within the current directory
  const indexFilePath = path.join(dir, 'index.md');

  // Add or update front matter to the index.md file for the current directory if needed
  const hasChildren = files.some(file => fs.statSync(path.join(dir, file)).isDirectory());
  if (!fs.existsSync(indexFilePath)) {
    // Create an index.md file if it doesn't exist
    fs.writeFileSync(indexFilePath, `# ${currentTitle}\n`, 'utf8');
  }
  addFrontMatter(indexFilePath, currentTitle, parentTitle !== 'docs' ? parentTitle : undefined, hasChildren);

  // Iterate over files and directories inside the current directory
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Recurse into the subdirectory, passing the current directory's title as the parent
      processDirectory(filePath, currentTitle);
    } else if (file.endsWith('.md') && file !== 'index.md') {
      // For regular .md files (not index.md), add front matter with the current directory as parent
      const fileTitle = formatTitle(path.basename(file, '.md'));
      addFrontMatter(filePath, fileTitle, currentTitle);
    }
  });
}

// Function to create _config.yml file with default configuration
function createConfigFile() {
  const configContent = `
title: "Snapper"
description: "Documentation for the Snapper Project"
remote_theme: pmarsceill/just-the-docs
plugins:
  - jekyll-remote-theme

# Just the Docs theme configuration
just_the_docs:
  search_enabled: true
  show_last_modified_time: true
  # Sidebar navigation is automatically generated based on the file structure
`;

  // Check if _config.yml already exists to avoid overwriting it
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, configContent.trim(), 'utf8');
    console.log('_config.yml file created successfully.');
  } else {
    console.log('_config.yml already exists, skipping creation.');
  }
}

// Start by creating the _config.yml file, then process the docs directory
createConfigFile();
processDirectory(docsPath);
