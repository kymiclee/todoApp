import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { FormControl, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect } from 'react';

import usePost from "../hooks/API/PostHook";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm(); // useForm hook for managing form state and validation
    const { postFetch, data: postData, loading: postLoading, error: postError } = usePost({ credentials: 'include' });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (postData) {
            console.log('Registration successful:', postData);
            handleClose();
        }
    }, [postData]);

    useEffect(() => {
        if (postError) {
            console.error('Error registering user:', postError.message);
            // Handle other errors (e.g., display an error message to the user)
        }
    }, [postError]);

    const onSubmit = async (formData) => {
        await postFetch('/users/register', formData);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Register
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Register Form</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('username', { required: true })}
                            sx={{ m: 1, width: '25ch' }}
                            variant='standard'
                            id='username'
                            name='username'
                            label='Username'
                            error={errors.username ? true : false}
                            helperText={errors.username ? "Username is required" : ""}
                        />
                        <TextField
                            {...register('password', { required: true })}
                            sx={{ m: 1, width: '25ch' }}
                            variant='standard'
                            id="password"
                            name='password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={errors.password ? true : false}
                            helperText={errors.password ? "Password is required" : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Register</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
