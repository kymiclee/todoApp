// @ts-nocheck
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    Dialog,
    DialogTitle,
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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { UseTodoListsContext } from "../hooks/UseTodoListsContext";
import { UseTodoItemsContext } from "../hooks/UseTodoItemsContext";
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
import TodoItemsDisplay from '../components/TodoItemsDisplay'

export default function TodoItem() {
    const { isAuthenticated } = UseUserAuthContext()// is user logged in 
    const { todoItems, dispatch } = UseTodoItemsContext() // useContext for all todo list for user
    const { todoLists, dispatch: dispatchList } = UseTodoListsContext()
    const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList() //id of current list
    const [editId, setEditId] = useState(null) // contain item id to display the edit button
    const [editTitle, setEditTitle] = useState(currentList.title || '')
    const [originalTitle, setOriginalTitle] = useState(currentList.title || '')
    const [newTask, setNewTask] = useState('')
    const [editTitleButtonClicked, setEditTitleButtonClicked] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [triggerFetch, setTriggerFetch] = useState(false)

    useEffect(() => {
        const fetchTodoItem = async () => {
            const listId = currentList._id
            const response = await fetch(`api/todo/items/${listId}`)
            const data = await response.json();
            setEditTitle(currentList.title || '')
            setOriginalTitle(currentList.title || '')
            console.log(data)
            if (response.ok) {
                dispatch({ type: 'SET_TODOITEM', payload: data })
                console.log(currentList.title)
                console.log(todoLists)
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
                method: "POST", 
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
                setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoLists[0] })
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
            console.log(currentList._id)
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
                console.log("Editing list with id of ", updatedTitle._id)
                console.log('response: ', updatedTitle)

                dispatchList({ type: 'PATCH_TODOLIST', payload: updatedTitle })
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        } catch (error) {
            console.log({ error: error.message })
        }
    }
    const DeleteList = async () => {
        setOpenDelete(false)
        try {
            console.log(currentList._id)
            const response = await fetch(`api/todo/list/${currentList._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.ok) {
                const deleteResponse = await response.json();
                console.log('response ok')
                console.log("Deleting list id: ", currentList._id)
                dispatchList({ type: 'DELETE_TODOLIST', payload: currentList })
                console.log('todoList set to ', todoLists[0])
                if (currentList._id == todoLists[0]._id) {
                    setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoLists[1] })
                } else {
                    setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoLists[0] })
                }
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        } catch (error) {
            console.log({ error: error.message })
        }
    }

    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleTitleSubmit = (e) => {
        setEditTitleButtonClicked(true); // Set edit button clicked to true
        console.log(editTitle);
        const data = { title: editTitle }; // Use the current value of editValue directly
        EditTitle(data);
        setOriginalTitle(editTitle); // Update originalValue after the edit is submitted
        setEditTitleButtonClicked(false); // Reset edit button clicked state after submission
    };

    const handleBlur = () => {
        if (!editTitleButtonClicked && originalTitle !== editTitle) {
            setEditTitle(originalTitle);
        }
        setEditTitleButtonClicked(false);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    return (
        <Box component="div" sx={{ backgroundColor: 'white', width: '70%' }}>
            <List>
                <ListItem
                    onBlur={handleBlur}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onMouseDown={handleOpenDelete}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {`Delete the list '${currentList.title}'`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Deleting List will delete all of its todo Items
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDelete}>Cancel</Button>
                            <Button onClick={DeleteList} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* {console.log(title)} */}
                    {currentList && currentList.title && (
                        <TextField
                            variant="outlined"
                            size="medium"
                            value={editTitle}
                            inputProps={{ style: { fontSize: '26px' } }}
                            sx={{ width: '100%' }}
                            onChange={handleTitleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start"
                                        onMouseDown={handleTitleSubmit}>
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

