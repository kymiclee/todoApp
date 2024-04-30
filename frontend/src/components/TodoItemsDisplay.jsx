// @ts-nocheck
import {
    Box,
    Button,
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
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { useState, useEffect } from 'react';


export default function TodoList({ todoItem, DeleteItem, EditItem, editId, setEditId }) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [editValue, setEditValue] = useState(todoItem.task);
    const [originalValue, setOriginalValue] = useState(todoItem.task);
    const [checkBox, setCheckBox] = useState(todoItem.isCompleted)


    const handleSelectListItem = () => {
        setEditId(todoItem._id);
    };

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditSubmit = (e) => {
        setEditButtonClicked(true); // Set edit button clicked to true
        console.log(editValue);
        const data = { task: editValue }; // Use the current value of editValue directly
        EditItem(todoItem._id, data);
        setOriginalValue(editValue); // Update originalValue after the edit is submitted
        setEditButtonClicked(false); // Reset edit button clicked state after submission

    };

    const handleBlur = () => {
        if (!editButtonClicked && originalValue !== editValue) {
            setEditValue(originalValue);
        }
        setEditButtonClicked(false);
    };
    const handleCheckBox = () => {// still need work
        console.log('checkbox is ', checkBox)
        checkBox ? setCheckBox(false) : setCheckBox(true);
        const response = await fetch(`api/todo/items/${currentList._id}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
    }

    return (
        <>
            <ListItem
                sx={{ height: "15%" }}
                key={todoItem._id}
                onClick={handleSelectListItem}
                onBlur={handleBlur}
            >
                <ListItemIcon>
                    <Checkbox
                        checked={checkBox}
                        edge="start"
                        aria-label="checkBox"
                        onMouseDown={handleCheckBox}
                    />
                </ListItemIcon>

                <TextField
                    variant="standard"
                    size="medium"
                    value={editValue}
                    inputProps={{ style: { fontSize: '16px' } }}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: editId === todoItem._id && (
                            <IconButton onMouseDown={handleEditSubmit}>
                                <EditIcon />
                            </IconButton>
                        )
                    }}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                        type="submit"
                        sx={{}}
                        onClick={() => {
                            DeleteItem(todoItem._id);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem >

        </>
    );
};

