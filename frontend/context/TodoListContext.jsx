// @ts-ignore
import { createContext, useReducer } from "react";

export const TodoListContext = createContext()

export const TodoListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOLIST':
            return { // the payload on the action that we pass into the dispatch function
                // would be an array of all of the workouts
                todoList: action.payload
            }
        case 'CREATE_TODOLIST':
            return {
                todoList: [action.payload, ...state.todoList]
            }
        case 'DELETE_TODOLIST':
            return {

                todoList: state.todoList.filter(todolist => todolist._id !== action.payload._id)

            }
        case 'PATCH_TODOLIST':
            return {
                // so if the workout id 
                todoList: state.todoList.map(todoList => todoList._id === action.payload._id ? action.payload : todoList)
            }
        default:
            return state
    }
}
export const TodoListContextProvider = ({ children }) => {
    const [todoList, dispatchList] = useReducer(TodoListReducer, { todoList: null });
    const resetList = () => {
        dispatchList({ type: 'SET_TODOLIST', payload: null });
    };
    return (
        <TodoListContext.Provider value={{ ...todoList, dispatchList, resetList }}>
            {children}

        </TodoListContext.Provider>
    )
}