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

removeReadmeFiles('./docs/docs/API');
