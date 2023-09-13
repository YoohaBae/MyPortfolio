import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [input, setInput] = useState('');

    const handleMenuClick = (menuItem) => {
        setInput(menuItem.toLowerCase());
    };

    const value = {
        input,
        setInput,
        handleMenuClick,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
