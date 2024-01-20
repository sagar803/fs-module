//Copy file using
// ***************** PROMISES API ******************* //
// const fs = require('fs/promises');

// (async () => {
//     try {
//         fs.copyFile('./5mb.txt', './copiedFile.txt')
//     } catch (error) {
//         console.log(error);
//     }
// })();


// ***************** CALLBACKS API *********************//
// const fs = require('fs');

// fs.copyFile('./5mb.txt', './newFile.txt', (error) => {
//     if(error) console.log(error)
// })

// ******************* SYNCHRONOUS API ******************* //
//const fs = require('fs');

//fs.copyFileSync('./5mb.txt', './newFile.txt')  





//https://nodejs.org/api/fs.html

// fs.open: Opens the file and provides a file descriptor (commandFileHandler). This is used to perform file operations such as reading, writing, etc.

// fs.watch: Sets up a file system watcher to listen for events like changes to the file. In your case, when a 'change' event occurs, it triggers the logic associated with reading the file content using the file descriptor obtained from fs.open.

const {createFile, deleteFile, addToFile, renameFile} = require('./controllers')
const fs = require('fs/promises');

( async () => {
    // commands
    const CREATE_FILE = "CREATE_FILE";
    const DELETE_FILE = "DELETE_FILE";
    const RENAME_FILE = "RENAME_FILE";
    const ADD_TO_FILE = "ADD_TO_FILE";
    
    const commandFileHandler = await fs.open("./command.txt", "r");


    commandFileHandler.on('change', async () => {
        const stat = await commandFileHandler.stat();
        // get the size of our file
        const size = stat.size;
        // allocate our buffer with the size of the file
        const buff = Buffer.alloc(size);
        // the location at which we want to start filling our buffer
        const offset = 0;
        // how many bytes we want to read
        const length = buff.byteLength;
        // the position that we want to start reading the file from
        const position = 0;

        // we always want to read the whole content (from beginning all the way to the end)
        await commandFileHandler.read(buff, offset, length, position);

        const command = buff.toString("utf-8");

        // create a file:
        // create a file <path>
        if (command.includes("CREATE_FILE")) {
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath);
        }
        // delete a file
        // delete the file <path>
        if (command.includes("DELETE_FILE")) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            if(filePath === 'controller.js' || filePath === 'app.js') {
                console('Not allowed')
            } else {
                deleteFile(filePath);
            }
        }
    
        // rename file:
        // rename the file <path> to <new-path>
        if (command.includes("RENAME_FILE")) {
            const _idx = command.indexOf(" to ");
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
            const newFilePath = command.substring(_idx + 4);
    
            renameFile(oldFilePath, newFilePath);
        }
    
        // add to file:
        // add to the file <path> this content: <content>
        if (command.includes("ADD_TO_FILE")) {
            const _idx = command.indexOf(" this content: ");
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
            const content = command.substring(_idx + 15);
    
            addToFile(filePath, content);
        }

    })


//    The for await...of loop in this context acts as a listener for file system events. It continuously listens for changes in the watched file or directory, and when a change occurs, the loop body is executed.

    //watcher
    const watcher = fs.watch('./command.txt')
    for await (const event of watcher){
        if(event.eventType === 'change'){    
            commandFileHandler.emit('change')
        }
    }        
})()

