import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, IconButton, InputAdornment, ListItem, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { UseCurrentTodoList } from "../hooks/UseCurrentTodoList";

export default function TodoListTitle({ handleBlur, handleDeleteList, handleTitleChange, handleTitleSubmit, editTitle }) {
    const { currentList } = UseCurrentTodoList()
    const [openDelete, setOpenDelete] = useState(false)

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleCustomTitleSubmit = () => {
        handleTitleSubmit();
    };
    useEffect(() => {
    }, [editTitle]);
    return (
        <ListItem
            onBlur={handleBlur}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onMouseDown={handleOpenDelete}
                    sx={{ opacity: 0.7 }}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {currentList && (
                    <DialogTitle id="alert-dialog-title">
                        {`Delete the list '${currentList.title}'`}
                    </DialogTitle>
                )}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting List will delete all of its todo Items
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={() => { handleCloseDelete(); handleDeleteList(); }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <TextField
                variant="outlined"
                size="medium"
                value={editTitle}
                inputProps={{ style: { fontSize: '26px' } }}
                sx={{ width: '100%' }}
                onChange={handleTitleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start"
                            onMouseDown={handleCustomTitleSubmit}>
                            <EditIcon />
                        </InputAdornment>
                    )
                }}
            />

        </ListItem >
    )
}