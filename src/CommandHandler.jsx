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

function cd(folderName) {
    const target = currentDir.children.find(child => child.name === folderName && child.type === 'folder');
    if (target) {
        currentDir = target;
    } else {
        return 'No such directory';
    }
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

function CommandHandler(command) {
    const [cmd, arg] = command.split(' ');

    switch (cmd) {
        case 'help':
            return help();
        case 'cd':
            return cd(arg);
        case 'ls':
            return ls();
        case 'cat':
            return cat(arg);
        case 'open':
            return open(arg);
        default:
            return 'Invalid command: ' + command + '\nType help for guidelines.';
    }
}

export default CommandHandler;