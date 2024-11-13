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

function removeReadmeLinks(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      removeReadmeLinks(filePath); // Recursively process subdirectories
    } else if (filePath.endsWith('.md')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Regex to find and replace links to README.md with plain text
      content = content.replace(/\[([^\]]+)\]\(.*?README\.md\)/g, '$1');

      fs.writeFileSync(filePath, content, 'utf8');
      // console.log(`Processed ${filePath}`);
    }
  });
}

removeReadmeFiles('./docs/docs/API');
removeReadmeLinks('./docs/docs/API')
