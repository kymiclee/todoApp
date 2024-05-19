// @ts-nocheck
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List } from '@mui/material';

import { UseTodoListsContext } from "../hooks/UseTodoListsContext";
import { UseTodoItemsContext } from "../hooks/UseTodoItemsContext";
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
    const { isAuthenticated } = UseUserAuthContext()// is user logged in 
    const { todoItems, dispatch: dispatchItems, resetTodoItem } = UseTodoItemsContext() // useContext for all todo list for user
    const { todoLists, dispatch: dispatchList, resetTodoList } = UseTodoListsContext()
    const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList() //id of current list
    const [editId, setEditId] = useState(null) // contain item id to display the edit button
    const [editTitle, setEditTitle] = useState(currentList?.title || '')
    const [originalTitle, setOriginalTitle] = useState(currentList?.title || '')
    const [editTitleButtonClicked, setEditTitleButtonClicked] = useState(false)
    const { postFetch, data: postData, loading: postLoading, postError } = usePost();
    const { deleteFetch, loading: deleteLoading, deleteError } = useDelete()
    const { putFetch, data: putData, loading: putLoading, putError } = usePut()
    const { fetchData, data: getData, loading: getLoading, getError } = useGet()
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
    }, [currentList, isAuthenticated, dispatchItems])

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
        } 1
    }, [getLoading, putLoading, postLoading, deleteLoading])




    useEffect(() => {
        dispatchItems({ type: 'SET_TODOITEM', payload: getData })
        console.log(currentList.title)
        console.log(todoLists)
    }, [getData])

    useEffect(() => {
        if (currentList == null) {
            resetTodoItem()
            resetTodoList()
            setEditTitle('')

        }
    }, [currentList])

    useEffect(() => { // updates the list after new Item is added
        if (putData && putData.task) {
            console.log('putData has been updated:', putData);
            dispatchItems({ type: 'PATCH_TODOITEM', payload: putData })
        }
        if (putData && putData.title) {
            dispatchList({ type: 'PATCH_TODOLIST', payload: putData })
        }
    }, [putData]);
    useEffect(() => { // updates the list after new Item is added
        if (postData) {
            console.log('postData has been created:', postData);
            dispatchItems({ type: 'CREATE_TODOITEM', payload: postData })
        }
    }, [postData]);

    const sortedTodoItems = () => {
        if (todoItems && !loading) {
            return todoItems.slice().sort((a, b) => {
                // Sort completed items first (true values come before false values)
                return a.isCompleted === b.isCompleted ? 0 : (a.isCompleted ? 1 : -1);
            })
            console.log('Sorted array: ', sortedArray)
            return sortedArray
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
            dispatchItems({ type: 'DELETE_TODOITEM', payload: itemId })
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
        try {
            await deleteFetch(`/list/${currentList._id}`);
            dispatchItems({ type: 'DELETE_TODOITEM', payload: currentList._id })
            dispatchList({ type: 'DELETE_TODOLIST', payload: currentList })

            if (currentList._id == todoLists[0]._id) {
                setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoLists[1] })
            } else {
                setCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: todoLists[0] })
            }

        } catch (error) {
            console.log({ error: error.message });
        }
    }

    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleTitleSubmit = (e) => {
        setEditTitleButtonClicked(true); // Set edit button clicked to true
        console.log(editTitle);
        if (editTitle == '') {
            openErrorDialog('Edit Title Error', 'Title cannot be empty')
            setEditTitle(originalTitle)
            return
        }
        const data = { title: editTitle }; // Use the current value of editValue directly
        handleEditTitle(data);
        setOriginalTitle(editTitle); // Update originalValue after the edit is submitted
        setEditTitleButtonClicked(false); // Reset edit button clicked state after submission
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

                {todoItems && sortedTodoItems().map((todoItem) => (
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

