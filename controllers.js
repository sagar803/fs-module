const fs = require('fs/promises');

const createFile = async (path) => {
    try {
        const existingFileHandle = await fs.open(path, "r");
        existingFileHandle.close();
        return console.log(`The file ${path} already exists.`);
    } catch (e) {
        const newFileHandle = await fs.open(path, "w");
        console.log("A new file was successfully created.");
        newFileHandle.close();
    }
};

const deleteFile = async (path) => {
    try {
        await fs.unlink(path);
        console.log("The file was successfully removed.");
    } catch (e) {
        if (e.code === "ENOENT") {
            console.log("No file at this path to remove.");
        } else {
            console.log("An error occurred while removing the file: ");
            console.log(e);
        }
    }
};

const renameFile = async (oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath);
        console.log("The file was successfully renamed.");
    } catch (e) {
        if (e.code === "ENOENT") {
            console.log(
                "No file at this path to rename, or the destination doesn't exist."
            );
        } else {
            console.log("An error occurred while removing the file: ");
            console.log(e);
        }
    }
};

let addedContent;

const addToFile = async (path, content) => {
    if (addedContent === content) return;
    try {
        const fileHandle = await fs.open(path, "a");
        fileHandle.write(content);
        addedContent = content;
        console.log("The content was added successfully.");
    } catch (e) {
        console.log("An error occurred while removing the file: ");
        console.log(e);
    }
};

module.exports = {
    createFile,
    deleteFile,
    renameFile,
    addToFile
};
