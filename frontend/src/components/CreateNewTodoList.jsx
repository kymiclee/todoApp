import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Input from '@mui/material/Input';
import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { UseUserAuthContext } from '../hooks/UseUserAuthContext'
import { UseTodoListsContext } from "../hooks/UseTodoListsContext";
import { UseErrorDialog } from '../hooks/UseErrorDialogContext';

export default function CreateNewTodoList({ onSubmit }) {
    const [open, setOpen] = React.useState(false);
    const { todoLists, dispatch: dispatchList } = UseTodoListsContext()
    const { isAuthenticated } = UseUserAuthContext()
    const { openErrorDialog } = UseErrorDialog();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        const titleValue = formData.get('title');
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            handleClose();
            return openErrorDialog('Authentication Error', 'User is not authenticated. Please log in.');
        }
        if (!titleValue.trim()) {
            console.log('running in else')
            formData = new FormData();
            formData.set('title', `New TodoList ${todoLists.length + 1}`);
        }
        const formJson = Object.fromEntries(formData.entries());
        console.log('todoLists:', todoLists);
        console.log(formData)
        const title = formJson.title;
        console.log('New todo list:', title);
        onSubmit(formJson)
        handleClose();
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon >
                    <AddIcon sx={{ fontSize: 40 }} />
                </ListItemIcon>
                <ListItemText
                    primary={
                        "Add New Todo List"
                    }
                />
            </ListItemButton>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Create Todo List</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ m: 1, width: '30ch' }}
                        variant='standard'
                        id='title'
                        name='title'
                        label='Todo List'
                        color='secondary'
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create List</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}