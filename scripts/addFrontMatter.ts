import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const projectRoot = path.join(__dirname, '..');
const docsPath = path.join(projectRoot, 'docs');
const teamDocsSourcePath = path.join(projectRoot, 'team_docs');
const teamDocsDestPath = path.join(docsPath, 'team_docs');
const configFilePath = path.join(docsPath, '_config.yml');

// Helper function to format title by replacing underscores or hyphens with spaces
function formatTitle(title: string): string {
  return title.replace(/[-_]/g, ' ').replace(/\.md$/, '').replace(/\.ts$/, '');
}

// Function to add front matter to a file if it doesn’t already have it
function addFrontMatter(
  filePath: string,
  title: string,
  parentTitle?: string,
  hasChildren: boolean = false
): void {
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
  const files: string[] = fs.readdirSync(dir);

  // Determine the current directory's title based on its name
  const currentTitle: string = formatTitle(path.basename(dir));

  // Path for the index.md file within the current directory
  const indexFilePath: string = path.join(dir, 'index.md');

  // Add or update front matter to the index.md file for the current directory if needed
  const hasChildren: boolean = files.some(file =>
    fs.statSync(path.join(dir, file)).isDirectory()
  );

  if (!fs.existsSync(indexFilePath)) {
    // Create an index.md file if it doesn't exist
    fs.writeFileSync(indexFilePath, `# ${currentTitle}\n`, 'utf8');
  }
  addFrontMatter(indexFilePath, currentTitle, parentTitle !== 'docs' ? parentTitle : undefined, hasChildren);

  // Iterate over files and directories inside the current directory
  files.forEach(file => {
    const filePath: string = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Recurse into the subdirectory, passing the current directory's title as the parent
      processDirectory(filePath, currentTitle);
    } else if (file.endsWith('.md') && file !== 'index.md') {
      // For regular .md files (not index.md), add front matter with the current directory as parent
      const fileTitle: string = formatTitle(path.basename(file, '.md'));
      addFrontMatter(filePath, fileTitle, currentTitle);
    }
  });
}

// Function to create _config.yml file with default configuration
function createConfigFile(): void {
  const configContent = `
title: "Snapper"
description: "Documentation for the Snapper Project"
baseurl: "" # the subpath of your site, e.g. /blog
url: "https://just-the-docs.com" # the base hostname & protocol for your site, e.g. http://example.com
repository: just-the-docs/just-the-docs # for github-metadata

remote_theme: pmarsceill/just-the-docs
plugins:
  - jekyll-remote-theme

# Just the Docs theme configuration
just_the_docs:
  search_enabled: true
  show_last_modified_time: true
  enable_copy_code_button: true
  heading_anchors: true

  # Back to top link
  back_to_top: true
  back_to_top_text: "Back to top"

  # Footer last edited timestamp
  last_edit_timestamp: true
  last_edit_time_format: "%b %e %Y at %I:%M %p" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html

  # Footer "Edit this page on GitHub" link text
  gh_edit_link: true # show or hide edit this page link
  gh_edit_link_text: "Edit this page on GitHub"
  gh_edit_repository: "https://github.com/just-the-docs/just-the-docs" # the github URL for your repo
  gh_edit_branch: "main" # the branch that your docs is served from
  # gh_edit_source: docs # the source that your files originate from
  gh_edit_view_mode: "tree" # "tree" or "edit" if you want the user to jump into the editor immediately

  # Color scheme currently only supports "dark", "light"/nil (default), or a custom scheme that you define
  color_scheme: nil

  callouts_level: quiet # or loud
  callouts:
    highlight:
      color: yellow
    important:
      title: Important
      color: blue
    new:
      title: New
      color: green
    note:
      title: Note
      color: purple
    warning:
      title: Warning
      color: red
`;

  // Check if _config.yml already exists to avoid overwriting it
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, configContent.trim(), 'utf8');
    console.log('_config.yml file created successfully.');
  } else {
    console.log('_config.yml already exists, skipping creation.');
  }
}

// Function to copy team_docs folder if it exists
function copyTeamDocs(): void {
  if (fs.existsSync(teamDocsSourcePath)) {
    // Ensure destination directory exists
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
    }
    if (fs.existsSync(teamDocsDestPath)) {
      fs.rmSync(teamDocsDestPath, { recursive: true, force: true });
    }
    // Copy the team_docs folder to the docs directory
    execSync(`cp -r ${teamDocsSourcePath} ${teamDocsDestPath}`);
    console.log('team_docs copied to docs/team_docs successfully.');
  } else {
    console.warn('No team_docs folder found at the root level.');
  }
}

// Start by creating the _config.yml file, then copy team_docs and process the docs directory
createConfigFile();
copyTeamDocs();
processDirectory(docsPath);
