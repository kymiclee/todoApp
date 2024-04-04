import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TodoListContextProvider } from '../context/TodoListContext.jsx';
import { TodoItemContextProvider } from '../context/TodoItemContext.jsx';
import { UserAuthContextProvider } from '../context/UserAuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <TodoListContextProvider>
        <TodoItemContextProvider>
          <App />
        </TodoItemContextProvider>
      </TodoListContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>,
)
