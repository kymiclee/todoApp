import { Button } from '@mui/material';
import { useEffect } from 'react';
import { UseUserAuthContext } from '../hooks/UseUserAuthContext'
import usePost from '../hooks/API/PostHook';
import { UseCurrentTodoList } from '../hooks/UseCurrentTodoList';
import { UseErrorDialog } from "../hooks/UseErrorDialogContext";

export default function Logout() {
    const { logout } = UseUserAuthContext()
    const { resetCurrentList } = UseCurrentTodoList()
    const { postFetch, postData, postError } = usePost();
    const { openErrorDialog } = UseErrorDialog();

    useEffect(() => {
        if (postError) {
            openErrorDialog('Log out Error', postError.message)
        }
    }, [postError])

    useEffect(() => {
        if (postData) {
            resetCurrentList();
            logout()
            console.log('User logged out')
        }
    }, [postData])

    async function onClick() {
        try {
            await postFetch('/users/logout')
        } catch (error) {
            console.log('Log out error: ', 'User logout failed')
        }
    }
    return (
        <Button variant="contained" onClick={onClick}>
            Logout
        </Button>
    )
}