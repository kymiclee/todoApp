import React from 'react'
import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import './App.css'

import NavBar from './components/NavBar'
import TodoList from './components/TodoLists'
import TodoItem from './components/TodoItems'

function App() {
  return (
    <Box maxWidth={1500} mx="auto" minHeight="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box sx={{ flexGrow: 1, display: 'flex', width: '100%', height: '100%' }}>
        <TodoList />
        <TodoItem />
      </Box>
    </Box>
  );
}



export default App
