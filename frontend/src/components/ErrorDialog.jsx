import { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { UseErrorDialog } from '../hooks/UseErrorDialogContext';

export default function ErrorDialog() {
    const { isOpen, alertMessage, alertTitle, closeErrorDialog } = UseErrorDialog();

    useEffect(() => {
        if (isOpen) {
            console.log('isOpen has changed:', isOpen);
        }
    }, [isOpen]);

    useEffect(() => {
        if (alertTitle) {
            console.log('alertTitle has changed:', alertTitle);
        }
    }, [alertTitle]);

    useEffect(() => {
        if (alertMessage) {
            console.log('alertMessage has changed:', alertMessage);
        }
    }, [alertMessage]);

    return (
        <Dialog
            open={isOpen}
            onClose={closeErrorDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alertTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"
                    dangerouslySetInnerHTML={{ __html: alertMessage }}>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeErrorDialog}>Got It</Button>
            </DialogActions>
        </Dialog >
    );
}
