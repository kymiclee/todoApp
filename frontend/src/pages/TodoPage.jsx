// @ts-nocheck
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import TodoList from '../components/TodoLists';
import TodoItem from '../components/TodoItems';

import ErrorDialog, { useErrorDialog } from "./ErrorDialog";
const TodoPage = () => {
    const backgroundColor = theme.palette.background.default;
import ErrorDialog, { useErrorDialog } from "./ErrorDialog";
    return (
        <Box sx={{ background: backgroundColor }}>
            <NavBar />
            <Box sx={{ width: '100vh' }}> {/* Adjust margin top according to the height of NavBar */}

                <TodoList />
                <TodoItem />
            </Box>
        </Box >
    );
};

export default TodoPage;
