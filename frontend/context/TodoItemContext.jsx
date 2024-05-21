// @ts-ignore
import { createContext, useReducer } from "react";

export const TodoItemContext = createContext()

function TodoItemReducer(state, action) {
    switch (action.type) {
        case 'SET_TODOITEM':
            return { // the payload on the action that we pass into the dispatch function
                // would be an array of all of the workouts
                todoItem: action.payload
            }
        case 'CREATE_TODOITEM':
            return {
                todoItem: [action.payload, ...state.todoItem]
            }
        case 'DELETE_TODOITEM':
            return {
                todoItem: state.todoItem.filter(todoItem => todoItem._id !== action.payload)
            }
        case 'PATCH_TODOITEM':
            return {
                // so if the workout id 
                todoItem: state.todoItem.map(todoItem => todoItem._id == action.payload._id ? action.payload : todoItem)
            }
        default:
            return state
    }
}
export const TodoItemContextProvider = ({ children }) => {
    const [todoItem, dispatchItem] = useReducer(TodoItemReducer, { todoItem: null });
    const resetItem = () => {
        dispatchItem({ type: 'SET_TODOITEM', payload: null });
    };
    return (
        <TodoItemContext.Provider value={{ ...todoItem, dispatchItem, resetItem }}>
            {children}
        </TodoItemContext.Provider>
    )
}