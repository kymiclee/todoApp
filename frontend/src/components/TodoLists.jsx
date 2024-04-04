// @ts-nocheck
import { styled, Drawer as MuiDrawer } from '@mui/material';

// Define the styled Drawer component
// Define the styled Drawer component
// const StyledDrawer = styled(MuiDrawer)({
//     position: "relative", // Set a minimum width
//     flexShrink: 0,
//     minWidth: "50%",
//     "& .MuiDrawer-paper": {// Set a minimum width
//         minWidth: "50%",
//         position: "absolute",
//         transition: "none !important",
//         width: "50%", // Allow the drawer to expand based on content
//         maxWidth: "100%", // Set the maximum width to 30% of container width
//     },
// });
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
        height: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "25%",
            minWidth: "25%",
        },
    },
    "&.MuiDrawer-docked": {
        flexShrink: 0,
        width: "25%", // Adjust this value as needed
        flexBasis: "25%", // Ensure the drawer retains its width in the docked state
        height: "100%",
        position: "relative",
    },
}));

import { useState, useEffect } from "react";

import { UseTodoListsContext } from "../hooks/UseTodoListsContext";
import { UseUserAuthContext } from '../hooks/UseUserAuthContext';
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

export default function TodoList({ drawerWidth }) {
    const handleListClick = (id) => {
        onSelectList(id);
    };
    const { isAuthenticated } = UseUserAuthContext();
    const { todoLists, dispatch: dispatchList } = UseTodoListsContext()

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


    return (

        <StyledDrawer variant="permanent"
        >
            {/*Empty Toolbar for spacing*/}
            <Toolbar />
            <Divider />
            <List>
                {todoLists && todoLists.map((todoList) => (
                    <ListItem key={todoList._id} disablePadding>
                        {console.log(todoList._id)}
                        <ListItemButton
                            onClick={() => {
                                // setCurrentList(todoList.id);
                            }}
                        // selected={currentList === todoList.id}
                        >
                            <ListItemText sx={{ ml: 0.5 }} primary={todoList.title} />
                        </ListItemButton>
                    </ListItem>

                ))}
            </List>
        </StyledDrawer>

    )
}

