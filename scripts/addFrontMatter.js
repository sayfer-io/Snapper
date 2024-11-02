"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// Update the path to the `docs` directory to be relative to the project root
var docsPath = path.join(__dirname, '..', 'docs');
var configFilePath = path.join(docsPath, '_config.yml');
// Helper function to format title by replacing underscores or hyphens with spaces
function formatTitle(title) {
    return title.replace(/[-_]/g, ' ').replace(/\.md$/, '').replace(/\.ts$/, '');
}
// Function to add front matter to a file if it doesn’t already have it
function addFrontMatter(filePath, title, parentTitle, hasChildren) {
    if (hasChildren === void 0) { hasChildren = false; }
    var content = fs.readFileSync(filePath, 'utf8');
    // Check if front matter already exists to avoid duplication
    if (content.startsWith('---')) {
        console.log("Front matter already exists for ".concat(filePath, ", skipping."));
        return;
    }
    // Create the front matter based on parameters
    var frontMatter = "---\nlayout: default\ntitle: \"".concat(title, "\"\n").concat(parentTitle && parentTitle !== 'docs' ? "parent: \"".concat(parentTitle, "\"") : "", "\n").concat(hasChildren ? "has_children: true" : "", "\n---\n");
    // Write the new content with front matter to the file
    fs.writeFileSync(filePath, frontMatter + content, 'utf8');
}
// Recursive function to process directories and add appropriate front matter
function processDirectory(dir, parentTitle) {
    var files = fs.readdirSync(dir);
    // Determine the current directory's title based on its name
    var currentTitle = formatTitle(path.basename(dir));
    // Path for the index.md file within the current directory
    var indexFilePath = path.join(dir, 'index.md');
    // Add or update front matter to the index.md file for the current directory if needed
    var hasChildren = files.some(function (file) { return fs.statSync(path.join(dir, file)).isDirectory(); });
    if (!fs.existsSync(indexFilePath)) {
        // Create an index.md file if it doesn't exist
        fs.writeFileSync(indexFilePath, "# ".concat(currentTitle, "\n"), 'utf8');
    }
    addFrontMatter(indexFilePath, currentTitle, parentTitle !== 'docs' ? parentTitle : undefined, hasChildren);
    // Iterate over files and directories inside the current directory
    files.forEach(function (file) {
        var filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Recurse into the subdirectory, passing the current directory's title as the parent
            processDirectory(filePath, currentTitle);
        }
        else if (file.endsWith('.md') && file !== 'index.md') {
            // For regular .md files (not index.md), add front matter with the current directory as parent
            var fileTitle = formatTitle(path.basename(file, '.md'));
            addFrontMatter(filePath, fileTitle, currentTitle);
        }
    });
}
// Function to create _config.yml file with default configuration
function createConfigFile() {
    var configContent = "\ntitle: \"Snapper\"\ndescription: \"Documentation for the Snapper Project\"\nremote_theme: pmarsceill/just-the-docs\nplugins:\n  - jekyll-remote-theme\n\n# Just the Docs theme configuration\njust_the_docs:\n  search_enabled: true\n  show_last_modified_time: true\n  # Sidebar navigation is automatically generated based on the file structure\n";
    // Check if _config.yml already exists to avoid overwriting it
    if (!fs.existsSync(configFilePath)) {
        fs.writeFileSync(configFilePath, configContent.trim(), 'utf8');
        console.log('_config.yml file created successfully.');
    }
    else {
        console.log('_config.yml already exists, skipping creation.');
    }
}
// Start by creating the _config.yml file, then process the docs directory
createConfigFile();
processDirectory(docsPath);
