"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
var projectRoot = path.join(__dirname, '..');
var docsPath = path.join(projectRoot, 'docs');
var teamDocsSourcePath = path.join(projectRoot, 'team_docs');
var teamDocsDestPath = path.join(docsPath, 'team_docs');
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
    var hasChildren = files.some(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
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
    var configContent = "\ntitle: \"Snapper\"\ndescription: \"Documentation for the Snapper Project\"\nbaseurl: \"\" # the subpath of your site, e.g. /blog\nurl: \"https://just-the-docs.com\" # the base hostname & protocol for your site, e.g. http://example.com\nrepository: just-the-docs/just-the-docs # for github-metadata\n\nremote_theme: pmarsceill/just-the-docs\nplugins:\n  - jekyll-remote-theme\n\n# Just the Docs theme configuration\njust_the_docs:\n  search_enabled: true\n  show_last_modified_time: true\n  enable_copy_code_button: true\n  heading_anchors: true\n\n  # Back to top link\n  back_to_top: true\n  back_to_top_text: \"Back to top\"\n\n  # Footer last edited timestamp\n  last_edit_timestamp: true\n  last_edit_time_format: \"%b %e %Y at %I:%M %p\" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html\n\n  # Footer \"Edit this page on GitHub\" link text\n  gh_edit_link: true # show or hide edit this page link\n  gh_edit_link_text: \"Edit this page on GitHub\"\n  gh_edit_repository: \"https://github.com/just-the-docs/just-the-docs\" # the github URL for your repo\n  gh_edit_branch: \"main\" # the branch that your docs is served from\n  # gh_edit_source: docs # the source that your files originate from\n  gh_edit_view_mode: \"tree\" # \"tree\" or \"edit\" if you want the user to jump into the editor immediately\n\n  # Color scheme currently only supports \"dark\", \"light\"/nil (default), or a custom scheme that you define\n  color_scheme: nil\n\n  callouts_level: quiet # or loud\n  callouts:\n    highlight:\n      color: yellow\n    important:\n      title: Important\n      color: blue\n    new:\n      title: New\n      color: green\n    note:\n      title: Note\n      color: purple\n    warning:\n      title: Warning\n      color: red\n";
    // Check if _config.yml already exists to avoid overwriting it
    if (!fs.existsSync(configFilePath)) {
        fs.writeFileSync(configFilePath, configContent.trim(), 'utf8');
        console.log('_config.yml file created successfully.');
    }
    else {
        console.log('_config.yml already exists, skipping creation.');
    }
}
// Function to copy team_docs folder if it exists
function copyTeamDocs() {
    if (fs.existsSync(teamDocsSourcePath)) {
        // Ensure destination directory exists
        if (!fs.existsSync(docsPath)) {
            fs.mkdirSync(docsPath, { recursive: true });
        }
        if (fs.existsSync(teamDocsDestPath)) {
            fs.rmSync(teamDocsDestPath, { recursive: true, force: true });
        }
        // Copy the team_docs folder to the docs directory
        (0, child_process_1.execSync)("cp -r ".concat(teamDocsSourcePath, " ").concat(teamDocsDestPath));
        console.log('team_docs copied to docs/team_docs successfully.');
    }
    else {
        console.warn('No team_docs folder found at the root level.');
    }
}
// Start by creating the _config.yml file, then copy team_docs and process the docs directory
createConfigFile();
copyTeamDocs();
processDirectory(docsPath);
