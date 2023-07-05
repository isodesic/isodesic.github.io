//Generate JSON array of images in the specified folder (courtesey of ChatGPT)
//run with node.js in PowerShell: "node gen_json.js"

const fs = require('fs');
const path = require('path');
const probe = require('probe-image-size'); // Requires the 'probe-image-size' package (npm install probe-image-size)

const folderPath = './'; // Replace with the actual folder path
const jsonFilePath = './images.json'; // Replace with the desired JSON file path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const imageFiles = files.filter(file => {
    const fileExtension = path.extname(file).toLowerCase();
    return fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png';
  });

  const landscapeImagePaths = [];

  imageFiles.forEach(file => {
    const filePath = path.join(folderPath, file);
    const dimensions = probe.sync(fs.readFileSync(filePath));
    if (dimensions.width > 1279) {
      if (dimensions.orientation) {
        if (dimensions.orientation < 5) {
          console.log(filePath + ': width = ' + dimensions.width + ', height = ' + dimensions.height + ', orientation = ' + dimensions.orientation + '\n');
          landscapeImagePaths.push(filePath);
        }
      } else {
        if (dimensions.width > dimensions.height) {
          console.log(filePath + ': width = ' + dimensions.width + ', height = ' + dimensions.height + ', orientation = ' + dimensions.orientation + '\n');
          landscapeImagePaths.push(filePath);
        }
      }
    }
  });

  const imagesJson = {
    images: landscapeImagePaths
  };

  fs.writeFile(jsonFilePath, JSON.stringify(imagesJson), err => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON file generated successfully.');
  });
});



/*
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
*/
