// @ts-nocheck
import { useState, useEffect } from "react";
import {
    Box,
    Checkbox,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
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
import EditIcon from '@mui/icons-material/Edit';

import { UseTodoItemsContext } from "../hooks/UseTodoItemsContext";
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
import TodoItemsDisplay from '../components/TodoItemsDisplay'

export default function TodoItem() {
    const { isAuthenticated } = UseUserAuthContext()// is user logged in 
    const { todoItems, dispatch } = UseTodoItemsContext() // useContext for all todo list for user
    const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList() //id of current list
    const [editId, setEditId] = useState(''); // contain item id to display the edit button
    const [title, setTitle] = useState(currentList.title);
    const [newTask, setNewTask] = useState('')
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
                // setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: currentList })
                console.log(todoItems)
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        } catch (error) {
            console.log({ error: error.message })
        }
    }
    const EditItem = async (itemId, formData) => {
        try {
            console.log(itemId)
            const response = await fetch(`api/todo/items/${currentList._id}/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                console.log('response ok')
                console.log("Editing item with id of ", itemId)
                const updatedItem = await response.json();
                dispatch({ type: 'PATCH_TODOITEM', payload: updatedItem })
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        } catch (error) {
            console.log({ error: error.message })
        }
    }
    const DeleteItem = async (itemId) => {
        try {
            console.log(itemId)
            const response = await fetch(`api/todo/items/${currentList._id}/${itemId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                console.log('response ok')
                console.log("deleting item with id of ", itemId)
                dispatch({ type: 'DELETE_TODOITEM', payload: itemId })

                console.log(todoItems)
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        } catch (error) {
            console.log({ error: error.message })
        }
    }

    const EditTitle = async (formData) => {
        try {
            const response = await fetch(`api/todo/list/${currentList._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const updatedTitle = await response.json();
                console.log('response ok')
                console.log("Editing item with id of ", updatedTitle._id)

                dispatch({ type: 'PATCH_TODOLIST', payload: updatedTitle })
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
                    {/* {console.log(title)} */}
                    {currentList && currentList.title && (
                        <TextField
                            variant="outlined"
                            size="medium"
                            value={currentList.title}
                            inputProps={{ style: { fontSize: '26px' } }}
                            sx={{ width: '100%' }}
                            onChange={(e) => { setTitle(e.target.value) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTitle(prevValue => {
                                                console.log('clicking edit Title')
                                                console.log('editTitle: ', prevValue)
                                                const data = { title: prevValue }
                                                console.log(data)
                                                EditTitle(data)
                                            })
                                        }}>
                                        <EditIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                </ListItem>
                <Divider />
                <ListItem sx={{ paddingTop: '20px' }}>
                    <TextField
                        label="New Todo Item"
                        variant="standard"
                        maxRows={1}
                        value={newTask}
                        inputProps={{ style: { fontSize: '22px' } }}
                        sx={{ width: '100%', marginTop: '-15px' }}
                        onChange={(e) => { setNewTask(e.target.value) }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        type="submit"
                                        color="primary"
                                        sx={{ fontSize: '18px' }}
                                        aria-label="directions"
                                        onClick={() => {
                                            const data = { task: newTask }
                                            console.log(newTask)
                                            NewTodohandleSubmit(data);
                                            setNewTask('')
                                        }}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                </ListItem >
                {todoItems && todoItems.map((todoItem) => (
                    <TodoItemsDisplay
                        key={todoItem._id}
                        todoItem={todoItem}
                        DeleteItem={DeleteItem}
                        EditItem={EditItem}
                        editId={editId}
                        setEditId={setEditId}
                    />
                ))
                }
            </List>
        </Box >

    )
}

