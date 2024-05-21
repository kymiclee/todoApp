import { useContext } from "react"

import { TodoListContext } from "../../context/TodoListContext"

export const UseTodoListContext = () => {
    const context = useContext(TodoListContext)

    if (!context) {
        throw Error('useTodoListContext must be used inside an TodoListsContextProvider')
    }

    return context
}