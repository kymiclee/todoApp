import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Input from '@mui/material/Input';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext'

export default function FormDialog() {
    const { login } = UseUserAuthContext();
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        // Access the username and password values
        // const username = formJson.username;
        // const password = formJson.password;
        // Log username and password for debugging
        // console.log('Username:', username);
        // console.log('Password:', password);


        const response = await fetch('/api/todo/users/login', {
            method: 'POST',
            body: JSON.stringify(formJson),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        // console.log('submitting', formJson);

        if (response.ok) {
            // Successful response, handle accordingly
            // const json = await response.json();
            // console.log('Response:', json);
            login()
            //window.location.reload();

        } else {
            // Handle unsuccessful response (e.g., show error message)
            const errorJson = await response.json();
            console.error('Error:', response.status, errorJson.error);
        }
    };
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit(event)
                        handleClose();
                    }
                }}
            >
                <DialogTitle>Login Form</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ m: 1, width: '30ch' }}
                        variant='standard'
                        id='username'
                        name='username'
                        label='Username'
                        color='secondary'
                    />
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            name='password'
                            color='secondary'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Login</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}