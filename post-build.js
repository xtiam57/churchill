const fs = require('fs-extra');
const path = require('path');

// Copy and delete .exe files from the dist directory to the docs directory

const sourceDir = './dist';
const destDir = './docs';

async function copyAndDeleteExeFiles() {
  try {
    // Ensure destination directory exists
    await fs.ensureDir(destDir);

    // Get list of all files in the destination directory
    let files = await fs.readdir(destDir);

    // Filter .exe files
    let exeFiles = files.filter((file) => path.extname(file) === '.exe');

    // Delete each .exe file from the destination directory
    for (const file of exeFiles) {
      const destFile = path.join(destDir, file);
      await fs.remove(destFile);
      console.log(`Deleted "${file}" from ${destDir}`);
    }

    // Get list of all files in the source directory
    files = await fs.readdir(sourceDir);

    // Filter .exe files
    exeFiles = files.filter((file) => path.extname(file) === '.exe');

    // Copy each .exe file to the destination directory
    for (const file of exeFiles) {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(destDir, file);
      await fs.copy(srcFile, destFile);
      console.log(`Copied "${file}" from ${sourceDir} to ${destDir}`);
    }

    console.log('Operation completed successfully.');
  } catch (error) {
    console.error('Error during file operations:', error);
  }
}

copyAndDeleteExeFiles();

// Update index.html file with new package versions
const htmlFilePath = './docs/index.html';
const jsonFilePath = './docs/version.json';
const packageJsonPath = 'package.json';

async function updatePackageVersions() {
  try {
    // Read package.json file
    const packageJson = await fs.readJson(packageJsonPath);
    const newVersion = packageJson.version;

    // Read the HTML file
    let htmlContent = await fs.readFile(htmlFilePath, 'utf8');
    // Create a regex to find and replace all version strings in the format digit.digit.digit
    const regexHTML = /(v| )\d+\.\d+\.\d+/g;
    // Replace the found versions with the new version
    htmlContent = htmlContent.replace(regexHTML, `$1${newVersion}`);

    // Write the modified HTML back to the file
    await fs.writeFile(htmlFilePath, htmlContent);
    console.log('Version updated in "index.html".');

    // Read the JSON file
    let jsonContent = await fs.readFile(jsonFilePath, 'utf8');
    // Create a regex to find and replace all version strings in the format digit.digit.digit
    const regexJSON = /\d+\.\d+\.\d+/g;
    // Replace the found versions with the new version
    jsonContent = jsonContent.replace(regexJSON, `${newVersion}`);

    // Write the modified JSON back to the file
    await fs.writeFile(jsonFilePath, jsonContent);
    console.log('Version updated in "version.json".');
  } catch (error) {
    console.error('Error during HTML manipulation:', error);
  }
}

updatePackageVersions();
