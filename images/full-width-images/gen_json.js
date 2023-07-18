//Generate JSON array of images in the specified folder (courtesey of ChatGPT)
//run with node.js in PowerShell: "node gen_json.js" and delete any sample images afterwards
/*
Ideal ratio for desktop: 128:67 (16:8.375, 3840x2010 OR 4126x2160)
Ideal ratio for mobile: 19:32 (9.5:16, 1280x2160)
iPhone 14/13 Pro resolution: 1170px x 2532px
iPhone 14 Plus/Pro Max: 1284px x 2778px
iPhone 14 Pro: 1179px x 2556px
iPhone 13 mini: 1080px x 2340px
*/

const fs = require('fs');
const path = require('path');
const probe = require('probe-image-size'); // Requires the 'probe-image-size' package (npm install probe-image-size)

const folderPath = './';
const landscapeImagesJsonFilePath = './landscape_images.json';
const portraitImagesJsonFilePath = './portrait_images.json';

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
  const portraitImagePaths = [];

  imageFiles.forEach(file => {
    const filePath = path.join(folderPath, file);
    const dimensions = probe.sync(fs.readFileSync(filePath));
    
    if (dimensions.orientation) {
      if (dimensions.orientation < 5) {
        //console.log(filePath + ': width = ' + dimensions.width + ', height = ' + dimensions.height + ', orientation = ' + dimensions.orientation + '\n');
        landscapeImagePaths.push(filePath);
      } else {
        portraitImagePaths.push(filePath);
      }
    } else {
      if (dimensions.width >= dimensions.height) {
        //console.log(filePath + ': width = ' + dimensions.width + ', height = ' + dimensions.height + ', orientation = ' + dimensions.orientation + '\n');
        landscapeImagePaths.push(filePath);
      } else {
        portraitImagePaths.push(filePath);
      }
    }
  });

  const landscapeImagesJson = {
    images: landscapeImagePaths
  };
  const portraitImagesJson = {
    images: portraitImagePaths
  };

  fs.writeFile(landscapeImagesJsonFilePath, JSON.stringify(landscapeImagesJson), err => {
    if (err) {
      console.error('Error writing Landscape Images JSON file:', err);
      return;
    }
    console.log('Landscape Images JSON file generated successfully.');
  });

  fs.writeFile(portraitImagesJsonFilePath, JSON.stringify(portraitImagesJson), err => {
    if (err) {
      console.error('Error writing Portrait Images JSON file:', err);
      return;
    }
    console.log('Portrait Images JSON file generated successfully.');
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
