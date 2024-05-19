import React, { createContext, useContext, useState } from 'react';

export const ErrorDialogContext = createContext();

export const ErrorDialogProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const openErrorDialog = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setIsOpen(true);
    };

    const closeErrorDialog = () => {
        setAlertTitle('');
        setAlertMessage('');
        setIsOpen(false);
    };

    return (
        <ErrorDialogContext.Provider value={{ isOpen, alertMessage, alertTitle, openErrorDialog, closeErrorDialog }}>
            {children}
        </ErrorDialogContext.Provider>
    );
};

