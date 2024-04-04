import React from 'react'
import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import './App.css'

import NavBar from './components/NavBar'
import TodoList from './components/TodoLists'

function App() {
  return (
    <Box maxWidth={1500} mx="auto" minHeight="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }}>
        <TodoList />

        {/* <TodoItems /> */}
      </Box>
    </Box>
  );
};



export default App
