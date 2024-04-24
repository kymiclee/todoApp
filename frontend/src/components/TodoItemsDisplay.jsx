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
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';


import { useState } from 'react';


export default function TodoList({ todoItem, DeleteItem, EditItem, editId, setEditId }) {
    const [buttonClicked, setButtonCLicked] = useState(false);
    const [editValue, setEditValue] = useState(todoItem.task);
    const [originalValue] = useState(todoItem.task);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editItem(todoItem._id, editValue);
        setIsEditing(false);
    };

    return (
        <>
            <ListItem
                key={todoItem._id}
                onClick={() => { setEditId(todoItem._id), console.log(todoItem._id), setEditValue(todoItem.task) }}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete"
                        type="submit"
                        sx={{ p: '10px' }}
                        onClick={() => {
                            DeleteItem(todoItem._id);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                }>
                <FormControl style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <FormControlLabel control={<Checkbox />} />
                    <Input
                        id="editTodo"
                        aria-describedby="my-helper-text"
                        maxRows={1}
                        sx={{ fontSize: '18px', mb: 2.5, width: '70%' }}
                        defaultValue={editValue}
                        onBlur={() => {
                            // if (!buttonClicked) {
                            //     setEditId(null);
                            //     setEditValue(originalValue)
                            // }
                        }}
                        onChange={(e) => { setEditValue(e.target.value) }}

                    />
                    {editId && editId == todoItem._id && (
                        <Button
                            variant="contained"
                            sx={{ m: 1, width: '10%', height: '10%' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setButtonCLicked(true)
                                setEditValue(prevValue => {
                                    console.log('clicking edit')
                                    console.log('editValue: ', prevValue)
                                    const data = { task: prevValue }
                                    console.log(data)
                                    EditItem(todoItem._id, data)

                                })
                                setEditId(null);
                            }}
                        >Edit</Button>
                    )}

                </FormControl>
            </ListItem >

        </>
    );
};
