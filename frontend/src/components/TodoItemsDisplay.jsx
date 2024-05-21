// @ts-nocheck
import { useState, useEffect } from 'react';
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';

export default function TodoList({ todoItem, handleDeleteItem, handleEditItem, editId, setEditId, putData, openErrorDialog }) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [editValue, setEditValue] = useState(todoItem.task);
    const [originalValue, setOriginalValue] = useState(todoItem.task);
    const [checkBox, setCheckBox] = useState(todoItem.isCompleted)
    const theme = useTheme();
    const color = theme.palette.mode === 'dark' ? 'white' : 'black';
    const handleSelectListItem = () => {
        setEditId(todoItem._id);
    };

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditSubmit = () => {
        setEditButtonClicked(true); // Set edit button clicked to true
        console.log(editValue);
        if (editValue == '') {
            openErrorDialog('Edit Task Error', 'Task cannot be empty')
            setEditValue(originalValue)
            return
        }
        const data = { task: editValue };
        handleEditItem(todoItem._id, data);
        setOriginalValue(editValue);

    };

    const handleBlur = () => {
        if (!editButtonClicked && originalValue !== editValue) {
            setEditValue(originalValue);
        }
        setEditButtonClicked(false);
    };

    const handleCheckBox = () => {
        console.log('checkbox is ', checkBox)
        const updatedCheckBox = !checkBox;
        console.log(updatedCheckBox)
        const check = { isCompleted: updatedCheckBox }
        console.log(check)
        handleEditItem(todoItem._id, check);
    }

    useEffect(() => {
        if (putData && putData._id === todoItem._id) {
            setCheckBox(putData.isCompleted);
            setEditValue(putData.task)
            setOriginalValue(putData.task)
        }
    }, [putData, todoItem._id]);

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
                    inputProps={{
                        style: {
                            fontSize: '16px',
                            textDecoration: checkBox ? 'line-through' : 'none',
                            color: checkBox ? 'grey' : color
                        }
                    }}
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
                        sx={{ opacity: checkBox ? '1' : '0.5' }}
                        onClick={() => {
                            handleDeleteItem(todoItem._id);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem >

        </>
    );
}

