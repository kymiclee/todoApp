// @ts-nocheck
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List } from '@mui/material';

import { UseTodoListContext } from "../hooks/UseTodoListContext";
import { UseTodoItemContext } from "../hooks/UseTodoItemContext";
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
import { UseErrorDialog } from "../hooks/UseErrorDialogContext";

import LoadingIcon from "./LoadingIcon";
import TodoItemsDisplay from './TodoItemsDisplay'
import TodoListTitle from "./TodoListTitle";
import NewTodoItemInput from "./NewTodoItemInput";

import usePost from "../hooks/API/PostHook";
import useDelete from '../hooks/API/DeleteHook';
import usePut from "../hooks/API/PutHook";
import useGet from "../hooks/API/GetHook";
import ErrorDialog from "./ErrorDialog";



export default function TodoItem() {
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'dark' ? '#121212' : '#fff';
    const { isAuthenticated } = UseUserAuthContext()
    const { todoItem, dispatchItem, resetItem } = UseTodoItemContext()
    const { todoList, dispatchList, resetList } = UseTodoListContext()
    const { currentList, setCurrentList } = UseCurrentTodoList()
    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle] = useState(currentList?.title || '')
    const [originalTitle, setOriginalTitle] = useState(currentList?.title || '')
    const [editTitleButtonClicked, setEditTitleButtonClicked] = useState(false)
    const { postFetch, postData, postLoading, postError } = usePost();
    const { deleteFetch, deleteLoading, deleteError } = useDelete()
    const { putFetch, putData, putLoading, putError } = usePut()
    const { fetchData, getData, getLoading, getError } = useGet()
    const { openErrorDialog } = UseErrorDialog();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchTodoItem = async () => {
            await fetchData(`/items/${currentList._id}`)
            setEditTitle(currentList.title || '')
            setOriginalTitle(currentList.title || '')
        }
        if (isAuthenticated && currentList && currentList._id) {
            fetchTodoItem()
        }
    }, [currentList, isAuthenticated, dispatchItem])

    useEffect(() => {
        if (postError) {
            openErrorDialog('POST Fetch Error', postError.message)
        }
    }, [postError])
    useEffect(() => {
        if (deleteError) {
            openErrorDialog('DELETE Fetch Error', deleteError.message)
        }
    }, [deleteError])

    useEffect(() => {
        if (putError) {
            openErrorDialog('PUT Fetch Error', putError.message)
        }
    }, [putError])

    useEffect(() => {
        if (getError) {
            openErrorDialog('GET Fetch Error', getError.message)
        }
    }, [getError])

    useEffect(() => {
        if (getLoading || putLoading || postLoading || deleteLoading) {
            setLoading(true)
            console.log('loading is true')
        } else {
            setLoading(false)
            console.log('loading is false')
        }
    }, [getLoading, putLoading, postLoading, deleteLoading])

    useEffect(() => {
        if (getData) {
            dispatchItem({ type: 'SET_TODOITEM', payload: getData })
        }
    }, [getData])

    useEffect(() => {
        if (currentList == null) {
            resetItem()
            resetList()
            setEditTitle('')

        }
    }, [currentList])

    useEffect(() => {
        if (putData && putData.task) {
            console.log('putData has been updated:', putData);
            dispatchItem({ type: 'PATCH_TODOITEM', payload: putData })
        }
        if (putData && putData.title) {
            dispatchList({ type: 'PATCH_TODOLIST', payload: putData })
        }
    }, [putData]);
    useEffect(() => {
        if (postData) {
            console.log('postData has been created:', postData);
            dispatchItem({ type: 'CREATE_TODOITEM', payload: postData })
        }
    }, [postData]);

    const sortedTodoItems = () => {
        if (todoItem && !loading) {
            return todoItem.slice().sort((a, b) => {
                return a.isCompleted === b.isCompleted ? 0 : (a.isCompleted ? 1 : -1);
            })
        }
        return []
    }
    const NewTodohandleSubmit = async (formData) => {
        try {
            await postFetch(`/items/${currentList._id}`, formData);
        } catch (error) {
            console.log({ error: error.message });
        }
    };
    const handleEditItem = async (itemId, formData) => {
        try {
            await putFetch(`/items/${currentList._id}/${itemId}`, formData);
        } catch (error) {
            console.log({ error: error.message });
        }
    }

    const handleDeleteItem = async (itemId) => {
        try {
            console.log("delete item with id of : ", itemId)
            await deleteFetch(`/items/${currentList._id}/${itemId}`);
            dispatchItem({ type: 'DELETE_TODOITEM', payload: itemId })
        } catch (error) {
            console.log({ error: error.message });
        }
    }
    const handleEditTitle = async (formData) => {
        try {
            await putFetch(`/list/${currentList._id}`, formData);
        } catch (error) {
            console.log({ error: error.message });
        }
    }
    const handleDeleteList = async () => {
        if (!isAuthenticated) {
            return openErrorDialog('Authentication Error', 'User is not authenticated. Please log in.')
        }
        try {
            await deleteFetch(`/list/${currentList._id}`);
            dispatchItem({ type: 'DELETE_TODOITEM', payload: currentList._id })
            dispatchList({ type: 'DELETE_TODOLIST', payload: currentList })

            if (currentList._id == todoList[0]._id) {
                setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoList[1] })
            } else {
                setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoList[0] })
            }
        } catch (error) {
            console.log({ error: error.message });
        }
    }

    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleTitleSubmit = () => {
        setEditTitleButtonClicked(true);
        console.log(editTitle);
        if (!isAuthenticated) {
            return openErrorDialog('Authentication Error', 'User is not authenticated. Please log in.')
        }
        if (editTitle == '') {
            openErrorDialog('Edit Title Error', 'Title cannot be empty')
            return setEditTitle(originalTitle)
        }
        const data = { title: editTitle };
        handleEditTitle(data);
        setOriginalTitle(editTitle);
        setEditTitleButtonClicked(false);
    };

    const handleBlur = () => {
        if (!editTitleButtonClicked && originalTitle !== editTitle) {
            setEditTitle(originalTitle);
        }
        setEditTitleButtonClicked(false);
    };

    return (
        <Box component="div" sx={{ width: '70%', marginTop: '56px', backgroundColor: { backgroundColor }, height: '100vh' }} >
            <List>
                <TodoListTitle
                    handleBlur={handleBlur}
                    handleDeleteList={handleDeleteList}
                    handleTitleChange={handleTitleChange}
                    handleTitleSubmit={handleTitleSubmit}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    originalTitle={originalTitle}
                />

                <Divider />
                < NewTodoItemInput NewTodohandleSubmit={NewTodohandleSubmit} openErrorDialog={openErrorDialog} />
                <LoadingIcon loading={loading} />
                <ErrorDialog />

                {todoItem && sortedTodoItems().map((todoItem) => (
                    <TodoItemsDisplay
                        key={todoItem._id}
                        todoItem={todoItem}
                        handleDeleteItem={handleDeleteItem}
                        handleEditItem={handleEditItem}
                        editId={editId}
                        setEditId={setEditId}
                        putData={putData}
                        openErrorDialog={openErrorDialog}
                    />
                ))
                }
            </List >
        </ Box >

    )
}

