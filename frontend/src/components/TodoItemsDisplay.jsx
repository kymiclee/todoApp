// @ts-nocheck
import {
    Box,
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




export default function TodoList({ todoItems, DeleteItem }) {
    return (
        <>
            {todoItems.map((todoItem) => (
                <ListItem key={todoItem._id} secondaryAction={
                    <IconButton edge="end" aria-label="delete"
                        type="submit"
                        sx={{ p: '10px' }}
                        onClick={() => {
                            DeleteItem(todoItem._id);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                }>
                    {console.log(todoItem._id)}
                    <FormControl style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <FormControlLabel control={<Checkbox />} />
                        <Input
                            id="newTodo"
                            aria-describedby="my-helper-text"
                            maxRows={1}
                            sx={{ fontSize: '18px', mb: 2.5, width: '70%' }}
                            defaultValue={todoItem.task}
                        />
                    </FormControl>
                    {/* <ListItemText sx={{ ml: 0.5, p: 0.6 }} primary={todoItem.task} /> */}
                </ListItem>
            ))}
        </>
    );
};
