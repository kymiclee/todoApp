// @ts-nocheck
import { useState, useEffect } from "react";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,

} from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDrawer } from "../assets/StyledDrawer";

import { UseTodoListContext } from "../hooks/UseTodoListContext";
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import CreateNewTodoList from './CreateNewTodoList';
import { UseErrorDialog } from "../hooks/UseErrorDialogContext";

import usePost from "../hooks/API/PostHook";
import useGet from "../hooks/API/GetHook";


export default function TodoList() {
    const { isAuthenticated } = UseUserAuthContext();
    const { todoList, dispatchList } = UseTodoListContext()
    const { currentList, dispatchCurrentList } = UseCurrentTodoList()
    const [successAlert, setSuccessAlert] = useState(false)
    const { fetchData, getData, getError } = useGet()
    const { postFetch, postData, postError } = usePost();
    const { openErrorDialog } = UseErrorDialog();

    useEffect(() => {
        if (postError) {
            openErrorDialog('POST Fetch Error', postError.message)
        }
    }, [postError])

    useEffect(() => {
        if (getError) {
            openErrorDialog('GET Fetch Error', postError.message)
        }
    }, [getError])

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
        const setTodoList = () => {
            dispatchList({ type: 'SET_TODOLIST', payload: getData });
            if (getData && getData.length > 0) {
                dispatchCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: getData[0] })

            } else {
                console.error('Todo list is empty or undefined.');
            }
        }
        if (getData) {
            setTodoList()
        }

    }, [getData])

    const handleNewList = async (formData) => {
        await postFetch('/lists/create', formData)

    }
    useEffect(() => {
        if (postData) {
            console.log('Response:', postData);
            dispatchList({ type: 'CREATE_TODOLIST', payload: postData });
            setSuccessAlert(true);
        }

    }, [postData])

    return (

        <StyledDrawer variant="permanent" sx={{ height: "100vh" }}>
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
                {todoList && todoList.map((todoList) => (
                    <ListItem key={todoList._id} disablePadding  >
                        <ListItemButton
                            onClick={() => {
                                dispatchCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoList });
                                console.log('selected: ', todoList)
                            }}
                            selected={currentList === todoList._id}
                            sx={{
                                backgroundColor: currentList === todoList._id ? '#FF0000' : 'inherit',
                                '&:hover': {
                                    backgroundColor: currentList === todoList._id ? '#FF0000' : 'rgba(0, 0, 0, 0.08)',
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

