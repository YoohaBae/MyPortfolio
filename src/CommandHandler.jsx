import {getProjects, getRecentProjects} from "./Api.jsx";

function CommandHandler(command) {
    if (command === 'help') {
        return 'Available commands: \n 1. about : displays all information regarding me' +
            '\n 2. projects : displays list of projects' +
            '\n 3. blog : display the most recent 10 blogs'+
            '\n 4. contact : displays contact information';
    } else if (command === "about") {
        return 'Hi, My name is Yooha Bae and ~';
    } else if (command.startsWith("projects")) {
        if (command === "projects -a") {
            var projects = getProjects();
            return projects;
        }
        else if (command === "projects") {
            var recentProjects = getRecentProjects();
            return 'These are the 5 recent projects I have done. To see all projects type projects -a' + recentProjects;
        }
        else {
            return
        }
    }
    else {
        return 'Invalid command. Type "help" for guidelines.'
    }
}

export default CommandHandler;