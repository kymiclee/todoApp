// @ts-ignore
import { createContext, useReducer } from "react";

export const TodoListContext = createContext()

export const TodoListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOLIST':
            return { // the payload on the action that we pass into the dispatch function
                // would be an array of all of the workouts
                todoLists: action.payload
            }
        case 'CREATE_TODOLIST':
            return {
                todoLists: [action.payload, ...state.todoLists]
            }
        case 'DELETE_TODOLIST':
            return {
                todoLists: state.todoLists.filter(todolist => todolist._id !== action.payload._id)
            }
        case 'PATCH_TODOLIST':
            return {
                // so if the workout id 
                todoLists: state.todoLists.map(todoList => todoList._id === action.payload._id ? action.payload : todoList)
            }
        default:
            return state
    }
}
export const TodoListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TodoListReducer, { todoLists: null });
    return (
        <TodoListContext.Provider value={{ ...state, dispatch }}>
            {children}

        </TodoListContext.Provider>
    )
}