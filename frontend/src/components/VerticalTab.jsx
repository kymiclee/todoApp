//@ts-nocheck
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from "react";
import { TextField } from "@mui/material"


import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
import { UseTodoListsContext } from "../hooks/UseTodoListsContext";
import { UseTodoItemsContext } from "../hooks/UseTodoItemsContext";
import { TodoItemDetails } from "./TodoItemDetails";
import { TodoListDetails } from "./TodoListDetails";
import DisplayTodoItems from './DisplayTodoItems';

function TabPanel(props) {
    const { children, value, index, title, ...other } = props;
    // console.log("Value:", value);
    // console.log("Index:", index);

    return (
        value === index && (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component='div'>
                            <h1>{title}</h1>
                            {children}

                        </Typography>
                    </Box>
                )}
            </div>
        ));
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const handleChange = (event, newValue) => {
        console.log('newValue :', newValue)
        setValue(newValue);

    }
    const { isAuthenticated } = UseUserAuthContext();
    const { todoLists, dispatch: dispatchList } = UseTodoListsContext()
    const { todoItems, dispatch: dispatchItem } = UseTodoItemsContext()
    // useEffect(() => {
    //     if (todoLists && todoLists.length > 0) {
    //         const initialValue = todoLists.length > 0 ? todoLists[0]._id : null;
    //         setValue(initialValue)
    //     }
    // }, [todoLists])


    //Fetching initial todoLists from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseList = await fetch('/api/todo/lists', { credentials: 'include' });
                const dataList = await responseList.json();
                console.log("Todo Lists");
                console.log(dataList);
                if (responseList.ok) {
                    dispatchList({ type: 'SET_TODOLIST', payload: dataList });
                } else {
                    console.error('Error:', responseList.status, dataList.error);
                }

                const responseItem = await fetch('/api/todo/items', { credentials: 'include' });
                const dataItem = await responseItem.json();
                console.log("Todo Items");
                console.log(dataItem);
                if (responseItem.ok) {
                    dispatchItem({ type: 'SET_TODOITEM', payload: dataItem });
                } else {
                    console.error('Error:', responseItem.status, dataItem.error);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            // Clear todo lists and items when user logs out
            dispatchList({ type: 'SET_TODOLIST', payload: [] });
            dispatchItem({ type: 'SET_TODOITEM', payload: [] });
        }
    }, [isAuthenticated, dispatchList, dispatchItem]);

    // Render loading indicator while data is being fetched
    if (loading) {
        return <p>Loading...</p>;
    }

    //Fetching inital todoItems from the server
    // useEffect(() => {
    //     const fetchTodoItem = async () => {
    //         // console.log("fetching items")
    //         const response = await fetch(`/api/todo/items`)
    //         // console.log(response)
    //         const data = await response.json();
    //         // console.log("Todo Items")
    //         // console.log(data)
    //         if (response.ok) {
    //             dispatchItem({ type: 'SET_TODOITEM', payload: data })
    //             // console.log(todoItems)
    //         } else {
    //             console.error('Error:', response.status, response);
    //         }
    //     }
    //     fetchTodoItem()
    //     console.log('Todo items useContext')
    //     console.log(todoItems)
    // }, [dispatchItem])

    // useEffect(() => {
    //     const updateTodoItem = async () => {

    //         const response = await fetch(`http://localhost:5000/api/todo/${listId}`)
    //         const data = await response.json();
    //         if (response.ok) {
    //             dispatchItem({ type: 'SET_TODOITEM', payload: data })
    //         } else {
    //             const errorJson = await response.json();
    //             console.error('Error:', response.status, errorJson.error);
    //         }
    //     }
    //     updateTodoItem()
    // }, [dispatchItem])

    // const newTodoItem = async (event, listId) => {
    //     const formData = new FormData(event.currentTarget);
    //     const formJson = Object.fromEntries(formData.entries());
    //     const response = await fetch(`http://localhost:5000/api/todo/${listId}`, {
    //         method: "POST", // or 'PUT'
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formJson),
    //     });
    //     const data = await response.json();
    //     if (response.ok) {
    //         dispatchItem({ type: 'CREATE_TODOITEM', payload: data })
    //     } else {
    //         const errorJson = await response.json();
    //         console.error('Error:', response.status, errorJson.error);
    //     }
    // }

    return (
        <Box
            sx={{
                flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600, padding: 5
            }}
        >
            {/* {console.log('Todo  useContext')}
            {console.log(todoLists)}
            {console.log(todoItems)} */}

            {
                todoLists && todoLists.length > 0 && (
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value + 1}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 2, borderColor: 'divider' }}
                    >
                        {/* This creates the vertical tabs with the title of the todoList */}
                        <Tab key='NewTodoList' value={0} index={0}>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Tab>
                        {todoLists.map((todoList, index) => (
                            <Tab
                                key={todoList._id}
                                value={index + 1}
                                label={todoList.title}
                                {...a11yProps({ index })}
                                sx={{ padding: '30px', fontSize: 16 }}
                            />
                        ))}
                    </Tabs>
                )
            }
            <TabPanel value={0} key={0} index={0}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </TabPanel>

            {
                todoLists && todoLists.length > 0 && todoLists.map((todoList, index) => (
                    <TabPanel
                        value={value + 1}
                        key={index + 1}
                        index={index + 1}
                        title={todoList.title}>
                        {value === index &&  // This condition controls the display of the tab panel
                            todoItems
                                .filter(todoItem => todoItem.todoList === todoList._id)
                                .map(todoItem => (
                                    <div key={todoItem._id}>{todoItem.task}</div>
                                ))
                        }
                        {value === index && todoItems.filter(todoItem => todoItem.todoList === todoList._id).length === 0 && (
                            <div>No items</div>
                        )}
                    </TabPanel>
                ))
            }

        </Box >
    )
}