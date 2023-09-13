// import {getProjects, getRecentProjects} from "./Api.jsx";

const fileSystem = {
    name: '/home',
    type: 'folder',
    children: [
        {
            name: 'about',
            type: 'folder',
            children: [
                {
                    name: 'README.md',
                    type: 'file',
                    content: 'Hi, My name is Yooha Bae and ~'
                }
            ]
        },
        {
            name: 'projects',
            type: 'folder',
            children: [
                {
                    name: 'GuROOM',
                    type: 'folder',
                    children: [
                        {
                            name: 'README.md',
                            type: 'file',
                            content: 'This is the GuROOM project.'
                        },
                        {
                            name: 'index.html',
                            type: 'file',
                            content: '<!-- Redirect to project page -->'
                        }
                    ]
                }
            ]
        },
        // ... other folders and files
    ]
};
let currentDir = fileSystem;
let dirStack = [];  // Initialize a stack to keep track of directory navigation


function cd(folderName, setPath) {
    if (folderName === '..') {
        // Navigate to the parent directory if it exists
        if (dirStack.length > 0) {
            currentDir = dirStack.pop();
            // Update the path to remove the last segment
            setPath(prevPath => {
                const segments = prevPath.split('/');
                segments.pop();
                return segments.join('/');
            });
        } else {
            return 'Already at the root directory';
        }
    } else {
        const target = currentDir.children.find(child => child.name === folderName && child.type === 'folder');
        if (target) {
            dirStack.push(currentDir);  // Push the current directory to the stack
            currentDir = target;
            // Update the path
            setPath(prevPath => prevPath + '/' + folderName);
        } else {
            return 'No such directory';
        }
    }
}

function pwd(path) {
    return path;  // Return the current path
}

function ls() {
    return currentDir.children.map(child => child.name).join('  ');
}

function cat(fileName) {
    const target = currentDir.children.find(child => child.name === fileName && child.type === 'file');
    if (target) {
        return target.content;
    } else {
        return 'No such file';
    }
}

function open(fileName) {
    const target = currentDir.children.find(child => child.name === fileName && child.type === 'file');
    if (target) {
        // Implement redirection to the project page
    } else {
        return 'No such file';
    }
}

function help() {
    return 'Available commands: \n 1. cd : maps to certain directory' +
        '\n 2. ls : displays list of files and folders in directory' +
        '\n 3. pwd : see current path of directory'+
        '\n 4. cat {file_name} : see contents of file'+
        '\n 5. open {index.html} : open a new page of index.html';
}


const funnyComments = [
    "Nice try, hacker! 😜",
    "Permission denied! Even sudo can't help you here.",
    "Nice try, but I can't let you do that, Dave.",
    "Error 403: Fun detected, but you're not authorized.",
    "Ah ah ah! You didn't say the magic word!",
    "File manipulation? On MY portfolio? Think again.",
    "User tried to be sneaky. It wasn't very effective.",
    "Initiating self-destruct in 3... 2... 1... Just kidding! But you can't do that.",
    "Achievement unlocked: 'Unauthorized Action Attempted'."
];

function getRandomComment() {
    const randomIndex = Math.floor(Math.random() * funnyComments.length);
    return funnyComments[randomIndex];
}


function CommandHandler(command, setPath, path, setOutput) {
    const [cmd, arg] = command.split(' ');

    switch (cmd) {
        case 'help':
            return help();
        case 'cd':
            return cd(arg, setPath); // Pass setPath
        case 'ls':
            return ls();
        case 'cat':
            return cat(arg);
        case 'open':
            return open(arg);
        case 'pwd':
            return pwd(path);  // Handle the pwd command
        case 'clear':
            setOutput([]);  // Clear the output array
            return '';  // Return an empty string or null to avoid adding to output
        case 'rm':
        case 'mkdir':
        case 'rmdir':
        case 'touch':
            return getRandomComment();
        default:
            return 'Invalid command: ' + command + '\nType help for guidelines.';
    }
}


export default CommandHandler;