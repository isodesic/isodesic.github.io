//Generate JSON array of images in the specified folder (courtesey of ChatGPT)
//run with node.js in PowerShell: "node gen_json.js"

const fs = require('fs');
const path = require('path');

const folderPath = './'; // Replace with the actual folder path
const jsonFilePath = './images.json'; // Replace with the desired JSON file path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const imagePaths = files.filter(file => {
    const fileExtension = path.extname(file).toLowerCase();
    return fileExtension === '.jpg';
  });

  const imagesJson = {
    images: imagePaths
  };

  fs.writeFile(jsonFilePath, JSON.stringify(imagesJson), err => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON file generated successfully.');
  });
});