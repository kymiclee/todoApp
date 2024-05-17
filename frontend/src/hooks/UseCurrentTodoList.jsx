import { useContext } from "react";
import { CurrentTodoList } from "../../context/CurrentTodoListContext";


export function UseCurrentTodoList() {
    const context = useContext(CurrentTodoList);


    if (context === undefined) {
        throw new Error('CurrentTodoList must be used within a AppStateProvider');
    }

    return context;
}