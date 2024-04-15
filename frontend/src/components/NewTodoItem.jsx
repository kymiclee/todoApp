import {
    Box,
    Checkbox,
    Divider,
    Drawer,
    FormControl,
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
export default function TodoItem() {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="newTodo">New Todo Item</InputLabel>
            <Input
                id="newTodo"
                aria-describedby="my-helper-text"
                maxRows={1}
                sx={{ fontSize: '18px' }}
                endAdornment={ // Use endAdornment prop instead of InputAdornment
                    <InputAdornment position="end">
                        <IconButton
                            type="submit"
                            color="primary"
                            sx={{ p: '10px' }}
                            aria-label="directions"
                            onClick={() => {
                                const inputValue = document.getElementById("newTodo").value;
                                const data = { task: inputValue }
                                NewTodohandleSubmit(data);
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}