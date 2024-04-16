// @ts-ignore
import { createContext, useReducer } from "react";

export const TodoItemContext = createContext()

function TodoItemReducer(state, action) {
    switch (action.type) {
        case 'SET_TODOITEM':
            return { // the payload on the action that we pass into the dispatch function
                // would be an array of all of the workouts
                todoItems: action.payload
            }
        case 'CREATE_TODOITEM':
            return {
                todoItems: [action.payload, ...state.todoItems]
            }
        case 'DELETE_TODOITEM':
            return {
                todoItems: state.todoItems.filter(todoItem => todoItem._id !== action.payload)
            }
        case 'PATCH_TODOITEM':
            return {
                // so if the workout id 
                todoItems: state.todoItems.map(todoItem => todoItem._id == action.payload._id ? action.payload : todoItem)
            }
        default:
            return state
    }
}
export const TodoItemContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TodoItemReducer, { todoItems: null });
    return (
        <TodoItemContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TodoItemContext.Provider>
    )
}