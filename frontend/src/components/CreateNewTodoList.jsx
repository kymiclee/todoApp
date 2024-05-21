import * as React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    TextField
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';


import { UseUserAuthContext } from '../hooks/UseUserAuthContext'
import { UseTodoListContext } from "../hooks/UseTodoListContext";
import { UseErrorDialog } from '../hooks/UseErrorDialogContext';

export default function CreateNewTodoList({ onSubmit }) {
    const [open, setOpen] = React.useState(false);
    const { todoList } = UseTodoListContext()
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
            formData.set('title', `New TodoList ${todoList.length + 1}`);
        }
        const formJson = Object.fromEntries(formData.entries());
        console.log('todoLists:', todoList);
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