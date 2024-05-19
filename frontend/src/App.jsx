import React from 'react'
import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import NavBar from './components/NavBar'
import TodoList from './components/TodoLists'
import TodoItem from './components/TodoItems'


export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box maxWidth={1500} mx="auto" minHeight="100vh" display="flex" flexDirection="column" sx={{ backgroundColor: mode === 'light' ? '#ffffff' : '#212121' }}>
          <NavBar />
          <Box sx={{ flexGrow: 1, display: 'flex', width: '100%', height: '100%' }}>
            <TodoList />
            <TodoItem />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



export default App
