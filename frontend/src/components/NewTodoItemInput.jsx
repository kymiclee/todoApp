import { useState } from "react";
import { IconButton, InputAdornment, ListItem, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function NewTodoItemInput({ NewTodohandleSubmit }) {
    const [newTask, setNewTask] = useState('')

    const handleInputValue = (e) => {
        setNewTask(e.target.value)
    }
    const handleInputSubmit = () => {
        const data = { task: newTask }
        console.log(newTask)
        NewTodohandleSubmit(data);
        setNewTask('')
    }

    return (
        <ListItem sx={{ paddingTop: '20px' }}>
            <TextField
                label="New Todo Item"
                variant="standard"
                maxRows={1}
                value={newTask}
                inputProps={{ style: { fontSize: '22px' } }}
                sx={{ width: '100%', marginTop: '-15px' }}
                onChange={handleInputValue}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                color="primary"
                                sx={{ fontSize: '18px' }}
                                aria-label="directions"
                                onClick={handleInputSubmit}
                            >
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </ListItem >
    )
}