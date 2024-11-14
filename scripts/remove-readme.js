// This file will remove readme files from the API documentation
const fs = require('fs');
const path = require('path');

const removeReadmeFiles = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          // Recursively search subdirectories
          removeReadmeFiles(filePath);
        } else if (file.toLowerCase() === 'readme.md') {
          // Delete the README.md file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${filePath}:`, err);
            }
          });
        }
      });
    });
  });
};

// Regular expression to match variations of the header line
const headerRegex = /^\[\*\*Snapper Project\*\*]\(\.\.\/(?:\.\.\/)*README\.md\) • \*\*Docs\*\*\n\n/gm;

function removeCustomHeader(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      removeCustomHeader(filePath); // Recursively process subdirectories
    } else if (filePath.endsWith('.md')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Remove the specific header line using regex
      const newContent = content.replace(headerRegex, '');
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
      }
    }
  });
}

removeReadmeFiles('./docs/docs/API');
removeCustomHeader('./docs/docs/API');
