import { Button } from '@mui/material';

import { UseUserAuthContext } from '../hooks/UseUserAuthContext'
import usePost from "../hooks/API/PostHook";
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import { useEffect } from 'react';
export default function Logout() {
    const { isAuthenticated, logout } = UseUserAuthContext()
    const { resetCurrentList } = UseCurrentTodoList()
    async function onClick() {
        const response = await fetch(`/api/todo/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            resetCurrentList();
            logout()
            console.log(isAuthenticated)
            console.log('User logged out')
        } else {
            console.log('User logout failed')

        }

    }
    return (
        <Button variant="contained" onClick={onClick}>
            Logout
        </Button>
    )
}