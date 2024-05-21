import { useContext } from "react"

import { TodoItemContext } from "../../context/TodoItemContext"

export const UseTodoItemContext = () => {
    const context = useContext(TodoItemContext)

    if (!context) {
        throw Error('useTodoItemContext must be used inside an TodoItemsContextProvider')
    }

    return context
}