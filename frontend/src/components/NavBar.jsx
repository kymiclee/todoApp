import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import RegisterPopup from './RegisterPopup'
import LoginPopup from './LoginPopup'
import Logout from './Logout';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext'
import { ColorModeContext } from '../App';
export default function ButtonAppBar() {
    const { isAuthenticated } = UseUserAuthContext();
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <AppBar position="fixed">
            <Container maxWidth="x1">
                <Toolbar>
                    <IconButton sx={{ ml: 1, marginRight: '16px' }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoList
                    </Typography>
                    {!isAuthenticated ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'horizontal', gap: '16px' }}>
                                <div><RegisterPopup /></div>
                                <div><LoginPopup /></div>
                            </div>
                        </>

                    ) : (
                        <Logout />
                    )}


                </Toolbar>
            </Container>
        </AppBar >
    );
}