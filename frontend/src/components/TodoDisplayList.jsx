import React, { useEffect, useState } from 'react';

import { DeleteOutlineRounded, Send } from '@mui/icons-material';
import {
    Box,
    Checkbox,
    Divider,
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
import { useAppState } from '../hooks/UseAppState';

export default function TodoDisplayList() {
    // const { currentList } = useAppState();
    // const { data, newItem, deleteItem, toggleChecked, updateItem } =
    //     useTodoList(currentList);
    // const { updateList } = useTodoLists();
    // const [newItemText, setNewItemText] = useState('');
    // const [originalListName, setOriginalListName] = useState('');
    // const [originalListItems, setOriginalListItems] = useState({});

    // useEffect(() => {
    //     if (data?.name) {
    //         setOriginalListName(data.name);
    //     }
    // }, [currentList, data?.name]);

    // useEffect(() => {
    //     if (data?.items) {
    //         setOriginalListItems(
    //             data.items.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {})
    //         );
    //     }
    // }, [data]);

    // useEffect(() => {
    //     // Your useEffect logic here
    // }, []); // Add dependencies if needed

    return (
        <Box component="main" sx={{ flexGrow: 1, border: 1, position: 'relative' }}>
            {/* TodoList title boxes */}
            <Box sx={{ width: '30%', border: 1, alignItems: 'center' }}>
                <h1>TodoList h1</h1>
            </Box>
            <Box sx={{ width: '30%', border: 1 }}>
                <h2>TodoList h2</h2>
            </Box>
            <Box sx={{ width: '30%', border: 1 }}>
                <h3>TodoList h3</h3>
            </Box>
            <Box sx={{ width: '30%', border: 1, alignItems: 'center' }}>
                <h3>TodoList h3</h3>
            </Box>
        </Box>
    );
}
