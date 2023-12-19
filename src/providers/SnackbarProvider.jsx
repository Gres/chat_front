import React, {createContext, useContext, useState} from 'react';
import {Snackbar} from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({children}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const openSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{openSnackbar, closeSnackbar}}>
            {children}
            <Snackbar
                open={snackbarOpen}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                message={snackbarMessage}

            />
        </SnackbarContext.Provider>
    );
};
