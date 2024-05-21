import React from 'react'
import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import NavBar from './components/NavBar'
import TodoList from './components/TodoLists'
import TodoItem from './components/TodoItems'
import TodoPage from './pages/TodoPage';



function App() {
  return (
    <TodoPage />
  )
}

export default App
