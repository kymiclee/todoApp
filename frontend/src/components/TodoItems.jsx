// @ts-nocheck
import { useState, useEffect } from "react";
import {
    Box,
    Checkbox,
    Divider,
    Drawer,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import { UseTodoItemsContext } from "../hooks/UseTodoItemsContext";
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';


export default function TodoItem() {
    const { isAuthenticated } = UseUserAuthContext();
    const { todoItems, dispatch } = UseTodoItemsContext()
    const { state: currentList, dispatch: modifyCurrentList } = UseCurrentTodoList()

    useEffect(() => {
        const fetchTodoItem = async () => {
            const listId = currentList._id
            const response = await fetch(`api/todo/items/${listId}`)
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                dispatch({ type: 'SET_TODOITEM', payload: data })
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        }
        if (isAuthenticated && currentList) {
            fetchTodoItem()
        }
    }, [currentList, isAuthenticated, dispatch])

    const NewTodohandleSubmit = async (formData) => {
        console.log(formData)
        try {
            const response = await fetch(`api/todo/items/${currentList._id}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json();
            if (response.ok) {
                console.log('response ok')
                dispatch({ type: 'CREATE_TODOITEM', payload: data })
                console.log(todoItems)
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        } catch (error) {
            console.log({ error: error.message })
        }
    }

    return (
        <Box component="div" sx={{ backgroundColor: 'white', width: '70%' }}>
            <List>

                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    {currentList && currentList.title && (
                        <ListItemText primaryTypographyProps={{ fontSize: '30px' }} primary={currentList.title} />
                    )}

                </ListItem>
                <Divider />
                <ListItem sx={{ paddingTop: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="newTodo">New Todo Item</InputLabel>
                        <Input
                            id="newTodo"
                            aria-describedby="my-helper-text"
                            maxRows={1}
                            sx={{ fontSize: '18px' }}
                            endAdornment={ // Use endAdornment prop instead of InputAdornment
                                <InputAdornment position="end">
                                    <IconButton
                                        type="submit"
                                        color="primary"
                                        sx={{ p: '10px' }}
                                        aria-label="directions"
                                        onClick={() => {
                                            const inputValue = document.getElementById("newTodo").value;
                                            const data = { task: inputValue }
                                            NewTodohandleSubmit(data);
                                        }}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </ListItem>
                {todoItems && todoItems.map((todoItem) => (
                    <ListItem key={todoItem._id} disablePadding >
                        {console.log(todoItem._id)}
                        <ListItemText sx={{ ml: 0.5, p: 0.6 }} primary={todoItem.task} />
                    </ListItem>

                ))}
            </List>
        </Box>








    )
}

