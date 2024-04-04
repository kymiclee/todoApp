// @ts-nocheck
import { useState, useEffect } from "react";

import { UseTodoItemsContext } from "../hooks/UseTodoItemsContext";
import { TodoItemDetails } from "./TodoItemDetails";


const TodoItem = ({ listId }) => {
    console.log(listId)
    const { todoItems, dispatch } = UseTodoItemsContext()

    useEffect(() => {
        const fetchTodoItem = async () => {

            const response = await fetch(`http://localhost:5000/api/todo/${listId}`)
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                dispatch({ type: 'SET_TODOITEM', payload: data })
            } else {
                const errorJson = await response.json();
                console.error('Error:', response.status, errorJson.error);
            }
        }
        fetchTodoItem()
    }, [dispatch])

    // const handleSubmit = async (event) => {

    //     const formData = new FormData(event.currentTarget);
    //     const formJson = Object.fromEntries(formData.entries());
    //     try {
    //         const response = await fetch("http://localhost:5000/api/todo/routes/todoList", {
    //             method: "POST", // or 'PUT'
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(formJson),
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             dispatch({ type: 'ADD_TODOLIST', payload: data })
    //         } else {
    //             const errorJson = await response.json();
    //             console.error('Error:', response.status, errorJson.error);
    //         }
    //     } catch (error) {
    //         console.log({ error: error.message })
    //     }
    // }

    return (
        <div className="todoItems">
            <h1>Hello</h1>

            {todoItems && todoItems.map((todoItem) => (
                <TodoItemDetails key={todoItem._id} todoList={todoItem} />
            ))}
        </div>

    )
}

export default TodoItem;