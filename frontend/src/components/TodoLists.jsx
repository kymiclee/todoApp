// @ts-nocheck
import { styled, Drawer as MuiDrawer } from '@mui/material';

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
    position: "relative",
    flexShrink: 0,
    minWidth: 240,
    "& .MuiDrawer-paper": {
        minWidth: 240,
        position: "absolute",
        transition: "none !important",
        width: "auto",
        maxWidth: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            minWidth: "100%",
        },
    },
    "&.MuiDrawer-docked": {
        flexShrink: 0,
        width: "30%", // Adjust this value as needed
        flexBasis: "30%", // Ensure the drawer retains its width in the docked state
        position: "relative",
    },
}));

import { useState, useEffect } from "react";
import {
    Box,
    Checkbox,
    Divider,
    Drawer,
    IconButton,
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
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { UseTodoListsContext } from "../hooks/UseTodoListsContext";
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import CreateNewTodoList from './CreateNewTodoList';


export default function TodoList() {
    // const handleListClick = (id) => {
    //     onSelectList(id);
    // };
    const { isAuthenticated } = UseUserAuthContext();
    const { todoLists, dispatch: dispatchList } = UseTodoListsContext()
    const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList()
    const [successAlert, setSuccessAlert] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseList = await fetch('/api/todo/lists', { credentials: 'include' });
                const todoList = await responseList.json();
                if (responseList.ok) {
                    dispatchList({ type: 'SET_TODOLIST', payload: todoList });
                    if (todoList && todoList.length > 0) {
                        console.log(todoList[0])
                        setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoList[0] });
                        console.log('Payload:', todoList[0]);
                    } else {
                        console.error('Todo list is empty or undefined.');
                    }
                } else {
                    console.error('Error:', responseList.status, todoList.error);
                }
                // setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                // setLoading(false);
            }
        };
        if (isAuthenticated) {
            fetchData();
        } else {
            // Clear todo lists and items when user logs out
            dispatchList({ type: 'SET_TODOLIST', payload: [] });
        }
    }, [isAuthenticated, dispatchList]);

    const handleSubmit = async (formData) => {
        if (isAuthenticated) {
            try {
                const response = await fetch('/api/todo/lists/create', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                console.log('submitting', formData);

                if (response.ok) {
                    // Successful response, handle accordingly
                    const newList = await response.json();
                    console.log('Response:', newList);
                    dispatchList({ type: 'CREATE_TODOLIST', payload: newList });
                    setSuccessAlert(true);
                } else {
                    // Handle unsuccessful response (e.g., show error message)
                    const errorJson = await response.json();
                    console.error('Error:', response.status, errorJson.error);
                    alert('Error creating todo list. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle other potential errors here
            }
        } else {
            // Handle case when user is not authenticated
            alert('User is not authenticated. Please log in.');
        }

    };
    return (

        <StyledDrawer variant="permanent"
        >
            {successAlert && (
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setSuccessAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    New todoList created
                </Alert>
            )}

            <List>
                <ListItem key={1} disablePadding sx={{ justifyContent: 'space-between' }} >
                    <CreateNewTodoList onSubmit={handleSubmit} />
                </ListItem>
                <Divider />
                {todoLists && todoLists.map((todoList) => (
                    <ListItem key={todoList._id} disablePadding >
                        <ListItemButton
                            onClick={() => {
                                setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoList });
                                console.log('selected: ', todoList)
                            }}
                            selected={currentList === todoList._id}
                            sx={{
                                backgroundColor: currentList === todoList._id ? '#FF0000' : 'inherit', // Change background color when selected
                                '&:hover': {
                                    backgroundColor: currentList === todoList._id ? '#FF0000' : 'rgba(0, 0, 0, 0.08)', // Change hover color when selected
                                },
                            }}
                        >
                            <ListItemText sx={{ ml: 0.5, p: 0.6 }} primary={todoList.title} />
                        </ListItemButton >
                    </ListItem>

                ))}
            </List>
        </StyledDrawer >

    )
}

