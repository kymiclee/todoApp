import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton,
    TextField
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { UseUserAuthContext } from '../../hooks/UseUserAuthContext';
import { UseErrorDialog } from '../../hooks/UseErrorDialogContext';
import usePost from '../../hooks/API/PostHook';

export default function FormDialog() {
    const { login } = UseUserAuthContext();
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { postFetch, postData, postError } = usePost();
    const { openErrorDialog } = UseErrorDialog();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (postData) {
            login()
        }
    }, [postData])

    useEffect(() => {
        if (postError) {
            openErrorDialog('Error logging in  user:', postError.message);
        }
    }, [postError]);

    const onSubmit = async (data) => {
        await postFetch('/users/login', data);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Login Form</DialogTitle>
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
                            <Button type="submit">Login</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
