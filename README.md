This Node.js application is designed to interpret commands related to file manipulation, such as creating, appending, deleting, and renaming files, from a specified file and then executing them.

I showcased the development of this app in one of the instructional videos within my Node.js course titled "Understanding File System."

The functionality of the application involves monitoring a file named "command.txt" for any modifications. Upon detecting a change, the app reads the content of the file and carries out the specified actions according to the user's instructions.

For example, if a user inputs "create a file text.txt" in the command.txt file and saves it, a file named file.txt will be generated in the current working directory. Absolute paths can also be specified for operations.

The available operations include:

- Creating a file: CREATE_FILE
- Deleting a file: DELETE_FILE
- Renaming a file: RENAME_FILE
- Appending to a file: ADD_TO_FILE

Commands should be formatted as follows in the command.txt file:

- create a file <path>
- delete the file <path>
- rename the file <path> to <new-path>
- add to the file <path> this content: <content>

It's important to note that only one command can be present and executed at a time in the command.txt file.

To run the application, clone the repository and execute the following command:

```
node app.js
```

This app exclusively utilizes the native fs module, eliminating the need to install additional packages.
