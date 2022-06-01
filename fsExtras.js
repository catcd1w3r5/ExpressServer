const fs = require('fs');
const {loggingFileSkipped} = require('./logging');
/**
 * Loads all files from a folder
 * @param folder {string} - The folder to search
 * @param fileExt {string} - The file extension to search for
 * @param loadingDelegate {function(string) : *} - The function to call when a file is found
 * @param recursive {boolean} - Whether to search recursively
 * @returns {*[]} - Array of files found (After processed by loadingDelegate)
 */
const LoadAllFilesFromFolder = (folder, fileExt, loadingDelegate, recursive = false) => {
    const scripts = [];
    const files = fs.readdirSync(folder);
    // if file ext has no dot, add one
    // eslint-disable-next-line no-param-reassign
    if (fileExt.indexOf('.') === -1) fileExt = `.${fileExt}`;
    files.forEach((file) => {
        if (!folder.startsWith('.')) folder = `.${folder}`;
        const filePath = `${folder}/${file}`;

        // if file is a folder, search it recursively (if enabled)
        if (recursive && fs.lstatSync(filePath).isDirectory()) scripts.push(...LoadAllFilesFromFolder(filePath, fileExt, loadingDelegate, recursive));
        else if (file.endsWith(fileExt)) scripts.push(loadingDelegate(filePath));
        else loggingFileSkipped(filePath);
    });
    return scripts;
};

/**
 * Ensures that a folder exists, and creates it if it doesn't
 * @param folder {string} - The folder to ensure exists
 */
    // eslint-disable-next-line no-unused-expressions
const EnsureFolderExistsSync = (folder) => fs.existsSync(folder) || fs.mkdirSync(folder);

module.exports = {
    LoadAllFilesFromFolder,
    EnsureFolderExistsSync,
};
