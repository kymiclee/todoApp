import { useState } from 'react';
import { Button, Dialog, DialogTitle, IconButton, InputAdornment, ListItem, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
export default function ErrorDialog({ alertTitle, alertMessage, open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alertTitle}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Got It</Button>
            </DialogActions>
        </Dialog>
    );
}

export const useErrorDialog = () => {
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

    return {
        openErrorDialog,
        closeErrorDialog,
        isOpen,
        alertMessage,
        alertTitle
    };
};