// @ts-nocheck
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import TodoList from '../components/TodoLists';
import TodoItem from '../components/TodoItems';
import ErrorDialog from '../components/ErrorDialog';
const TodoPage = () => {


    return (
        <Box className='App'>
            <div className='NavBar'>
                <NavBar />
            </div>
            <TodoList />
            <TodoItem />

        </Box>

    );
};

export default TodoPage;
