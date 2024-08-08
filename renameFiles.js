const fs = require('fs');
const path = require('path');
const unidecode = require('unidecode');

// Directory to scan
const directoryPath = './your-directory'; // Change this to your target directory

// Function to rename files
function renameFilesInDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error stating file:', err);
          return;
        }

        if (stats.isFile()) {
          // Convert filename to ASCII
          const asciiName = unidecode(file);
          const newFilePath = path.join(directory, asciiName);

          if (filePath !== newFilePath) {
            fs.rename(filePath, newFilePath, err => {
              if (err) {
                console.error('Error renaming file:', err);
              } else {
                console.log(`Renamed: ${file} -> ${asciiName}`);
              }
            });
          }
        } else if (stats.isDirectory()) {
          // Recursively rename files in subdirectories
          renameFilesInDirectory(filePath);
        }
      });
    });
  });
}

// Start the renaming process
renameFilesInDirectory(directoryPath);
