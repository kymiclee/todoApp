// @ts-ignore
import { useReducer } from "react";
import { createContext } from "react";

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
    const [currentList, dispatchCurrentList] = useReducer(reducer, { currentList: null });
    const resetCurrentList = () => {
        dispatchCurrentList({ type: 'SET_CURRENT_TODO_LIST', payload: null });
    };




    return (
        <CurrentTodoList.Provider value={{ currentList, dispatchCurrentList, resetCurrentList }}>
            {children}

        </CurrentTodoList.Provider>
    )
}