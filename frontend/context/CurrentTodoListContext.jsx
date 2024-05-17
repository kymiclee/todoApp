// @ts-ignore
import { useReducer } from "react";
import { createContext, useState } from "react";

export const CurrentTodoList = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TODO_LIST':
            return action.payload;
        case 'UPDATE_CURRENT_TODO_LIST_NAME':
            return { ...state.currentList, name: action.payload };
        default:
            return state;
    }
};
export const CurrentTodoListProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { currentList: null });
    const resetCurrentList = () => {
        dispatch({ type: 'SET_CURRENT_TODO_LIST', payload: null });
    };




    return (
        <CurrentTodoList.Provider value={{ state, dispatch, resetCurrentList }}>
            {children}

        </CurrentTodoList.Provider>
    )
}