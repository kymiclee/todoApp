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

import usePost from "../hooks/API/PostHook";
import useGet from "../hooks/API/GetHook";
import usePut from "../hooks/API/PutHook";

export default function TodoList() {
    const { isAuthenticated } = UseUserAuthContext();
    const { todoLists, dispatch: dispatchList } = UseTodoListsContext()
    const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList()
    const [successAlert, setSuccessAlert] = useState(false)
    const { fetchData, data: getData, loading: getLoading, error: getError } = useGet()
    const { postFetch, data: postData, error: postError } = usePost();

    useEffect(() => {
        const fetchTodoList = async () => {
            await fetchData('/lists', { credentials: 'include' })
        }
        if (isAuthenticated) {
            fetchTodoList()
        } else {
            dispatchList({ type: 'SET_TODOLIST', payload: [] });
        }
    }, [isAuthenticated, dispatchList])

    useEffect(() => {
        dispatchList({ type: 'SET_TODOLIST', payload: getData });
        if (getData && getData.length > 0) {
            console.log(getData[0])
            setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: getData[0] })
            console.log('Payload:', getData[0]);
        } else {
            console.error('Todo list is empty or undefined.');
        }

    }, [getData])
    const handleNewList = async (formData) => {
        if (isAuthenticated) {
            await postFetch('/lists/create', formData)
        } else {
            alert('User is not authenticated. Please log in.');
        }
    }
    useEffect(() => {
        if (postData) {
            console.log('Response:', postData);
            dispatchList({ type: 'CREATE_TODOLIST', payload: postData });
            setSuccessAlert(true);
        }

    }, [postData])

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
                    <CreateNewTodoList onSubmit={handleNewList} />
                </ListItem>
                <Divider />
                {todoLists && todoLists.map((todoList) => (
                    <ListItem key={todoList._id} disablePadding  >
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

