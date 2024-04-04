import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Input from '@mui/material/Input';

export default function FormDialog() {
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

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        // Access the username and password values
        const username = formJson.username;
        const password = formJson.password;
        // Log username and password for debugging
        console.log('Username:', username);
        console.log('Password:', password);


        try {
            const response = await fetch('/api/todo/users/register', {
                method: 'POST',
                body: JSON.stringify(formJson),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                // Registration successful
                const json = await response.json();
                console.log('Registration successful:', json);
                handleClose(); // Close the dialog or perform other actions
            } else {
                // Registration failed
                const errorJson = await response.json();
                console.error('Registration failed:', response.status, errorJson.error);
                // Display an error message to the user
                // Example: setErrorState(errorJson.error);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle other errors (e.g., network issues)
            // Example: setErrorState('An error occurred while registering. Please try again later.');
        }
    };


    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Register
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
                <DialogTitle>Register Form</DialogTitle>
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
                    <Button type="submit">Register</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}