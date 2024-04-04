import { useContext } from "react"

import { TodoItemContext } from "../../context/TodoItemContext"

export const UseTodoItemsContext = () => {
    const context = useContext(TodoItemContext)

    if (!context) {
        throw Error('useTodoItemsContext must be used inside an TodoItemsContextProvider')
    }

    return context
}