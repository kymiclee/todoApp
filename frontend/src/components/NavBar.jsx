

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import RegisterPopup from './Popup/RegisterPopup'
import LoginPopup from './Popup/LoginPopup'
import Logout from './Logout';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext'
import { ColorModeContext } from '../pages/TodoPage';
export default function ButtonAppBar() {
    const { isAuthenticated } = UseUserAuthContext();
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
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