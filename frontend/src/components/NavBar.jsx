import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import RegisterPopup from './RegisterPopup'
import LoginPopup from './LoginPopup'
import Logout from './Logout';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext'

export default function ButtonAppBar() {
    const { isAuthenticated } = UseUserAuthContext();
    return (
        <AppBar position="static">
            <Container maxWidth="x1">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoList
                    </Typography>
                    {!isAuthenticated ? (
                        <div>
                            <RegisterPopup />
                            <LoginPopup />
                        </div>

                    ) : (
                        <Logout />
                    )}


                </Toolbar>
            </Container>
        </AppBar>
    );
}