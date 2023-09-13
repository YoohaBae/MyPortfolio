import { useState, useEffect } from 'react';
import './App.css';
import commandHandler from "./CommandHandler.jsx";
import { useAppContext } from './AppContext';  // Import the custom hook from AppContext

function App() {
    const { input, setInput, _, path, setPath } = useAppContext();  // Use the context
    const [output, setOutput] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [loadingPercent] = useState(0);

    useEffect(() => {
        const helloASCII = `\
     __  __     ______     __         __         ______    
    /\\ \\_\\ \\   /\\  ___\\   /\\ \\       /\\ \\       /\\  __ \\   
    \\ \\  __ \\  \\ \\  __\\   \\ \\ \\____  \\ \\ \\____  \\ \\ \\/\\ \\  
     \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\ \\_____\\ 
      \\/_/\\/_/   \\/_____/   \\/_____/   \\/_____/   \\/_____/ 
  `;

        let initialOutput = [
            { type: 'text', content: 'Initializing connection...' }
        ];

        setOutput(initialOutput);

        let newPercent = 0;

        const loadingTimer = setInterval(() => {
            if (newPercent < 100) {
                newPercent += 10;
                setOutput(prev => [...prev, { type: 'text', content: `[${'='.repeat(newPercent / 10)}>${'.'.repeat(10 - newPercent / 10)}] ${newPercent}%` }]);
            }
        }, 200);

        const timer1 = setTimeout(() => {
            clearInterval(loadingTimer);
            setOutput(prev => [...prev, { type: 'text', content: 'Connection established!\n\nCan you hack into my information?' }, { type: 'text', content: helloASCII }]);
        }, 2300);

        const timer2 = setTimeout(() => {
            setShowPrompt(true);
        }, 3300);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearInterval(loadingTimer);
        };
    }, []);



    const handleCommand = (command) => {
        var oneOutput = commandHandler(command, setPath, path, setOutput); // Pass setPath
        if (oneOutput !== '') {  // Avoid adding empty lines to the output
            setOutput([...output, { type: 'text', content: oneOutput }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOutput([...output, { type: 'command', content: `visitor@mynameblog  /home % ${input}  ` }]);
        handleCommand(input);
        setInput('');
    };


    return (
        <div className="App">
            <header className="App-header">
                <div className="terminal">
                    {output.map((line, index) => (
                        <div key={index} className={line.type}>
                            {line.content}
                        </div>
                    ))}
                    {loadingPercent > 0 && <div>[{'='.repeat((loadingPercent / 10))}&gt;{'.'.repeat(10 - (loadingPercent / 10))}] {loadingPercent}%</div>}
                    {showPrompt && (
                        <div className={"text"}>

                        <form onSubmit={handleSubmit}>
                            <span>visitor@mynameblog  {path} %&nbsp;</span>
                            <input
                                type="text"
                                value={input}
                                placeholder="Type 'help' for guidelines"
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                            />
                        </form>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;