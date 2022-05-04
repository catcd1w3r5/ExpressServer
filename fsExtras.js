const fs = require('fs');

/**
 * Loads all files from a folder
 * @param folder {string} - The folder to search
 * @param fileExt {string} - The file extension to search for
 * @param loadingDelegate {function(string) : *} - The function to call when a file is found
 * @param recursive {boolean} - Whether to search recursively
 * @returns {*[]} - An array of files found (After processed by loadingDelegate)
 */
const LoadAllFilesFromFolder = (folder, fileExt, loadingDelegate, recursive = false) => {
  const scripts = [];
  const files = fs.readdirSync(folder);
  // if file ext has no dot, add one
  // eslint-disable-next-line no-param-reassign
  if (fileExt.indexOf('.') === -1) fileExt = `.${fileExt}`;
  files.forEach((file) => {
    // TEMP FIX TODO (if u r not a cat u can ignore this)
    // const filePath = `${folder}/${file}`;
    const filePath = `.${folder}/${file}`;
    if (file.endsWith(fileExt)) {
      scripts.push(loadingDelegate(filePath));
    } else if (recursive && fs.lstatSync(filePath)
      .isDirectory()) {
      scripts.push(...LoadAllFilesFromFolder(filePath, fileExt, loadingDelegate, recursive));
    }
  });
  return scripts;
};

/**
 * Ensures that a folder exists, and creates it if it doesn't
 * @param folder {string} - The folder to ensure exists
 */
const EnsureFolderExistsSync = (folder) => {
  // eslint-disable-next-line no-unused-expressions
  fs.existsSync(folder) || fs.mkdirSync(folder);
};

/**
 * Ensures that a folder exists, and creates it if it doesn't
 * @param folder {string} - The folder to ensure exists
 * @param callback {function(Error) : void} - The function to call when a file is found
 */
// fs.exists is deprecated, using fs.existsSync instead
const EnsureFolderExists = (folder, callback) => {
  if (!fs.existsSync(folder)) fs.mkdir(folder, callback);
};

module.exports = {
  LoadAllFilesFromFolder,
  EnsureFolderExists,
  EnsureFolderExistsSync,
};
