import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TodoListContextProvider } from '../context/TodoListContext.jsx';
import { TodoItemContextProvider } from '../context/TodoItemContext.jsx';
import { UserAuthContextProvider } from '../context/UserAuthContext.jsx';
import { CurrentTodoListProvider } from '../context/CurrentTodoListContext.jsx';
import { ErrorDialogProvider } from '../context/ErrorDialogContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <UserAuthContextProvider>
      <ErrorDialogProvider>
        <CurrentTodoListProvider>
          <TodoListContextProvider>
            <TodoItemContextProvider>
              <App />
            </TodoItemContextProvider>
          </TodoListContextProvider>
        </CurrentTodoListProvider>
      </ErrorDialogProvider >
    </UserAuthContextProvider>
  </React.StrictMode>,
)
