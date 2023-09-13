import { useState } from 'react';
import './ResponsiveAppBar.css';
import { useAppContext } from './AppContext';  // Import the custom hook from AppContext


const pages = ['About', 'Career', 'Projects', 'Blog', 'Contact'];

function ResponsiveAppBar() {
    const [sideTabOpen, setSideTabOpen] = useState(false);

    const toggleSideTab = () => setSideTabOpen(!sideTabOpen);
    const closeSideTab = () => setSideTabOpen(false);
    const { handleMenuClick } = useAppContext();  // <-- use context here

    const handleMenuItemClick = (menuItem) => {
        closeSideTab();
        handleMenuClick(menuItem);  // Update the input state in App.jsx
    };
    return (
        <div className="app-bar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <button onClick={toggleSideTab} className="terminal-style">&#9776;</button>
                    <div className="logo-placeholder"></div>
                    <div className="terminal-style logo-text">Yooha</div> {/* Updated class */}
                    <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        {pages.map((page, index) => (
                            <div
                                key={index}
                                className={`terminal-style side-tab-item`}
                                onClick={() => handleMenuItemClick(page)}
                            >
                                {page}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`side-tab ${sideTabOpen ? 'show' : ''}`}>
                <div className="side-tab-button-container">
                    <button className="terminal-style side-tab-button" onClick={closeSideTab}>X</button>
                </div>
                {pages.map((page, index) => (
                    <div key={index} className={`terminal-style side-tab-item`} onClick={toggleSideTab}>
                        {page}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResponsiveAppBar;
