import { useContext } from "react"

import { TodoListContext } from "../../context/TodoListContext"

export const UseTodoListsContext = () => {
    const context = useContext(TodoListContext)

    if (!context) {
        throw Error('useTodoListsContext must be used inside an TodoListsContextProvider')
    }

    return context
}