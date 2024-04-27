const express = require('express');
const todoItem = require('../models/todoItem')
const todoList = require('../models/todoList');

module.exports.getAllItems = async (req, res) => {
    try {
        const { listId } = req.params
        console.log(listId)
        const userId = req.session.user.id
        // const userId = "65fa0ca114a7231d1d2e1388"
        const todoItems = await todoItem.find({ todoList: listId })
        console.log('todoItems: ', todoItems)
        return res.status(200).json(todoItems)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports.createTodoItem = async (req, res) => {
    const { task } = req.body
    const { listId } = req.params
    // const listId = "6606429f24ba990c28fa4dbe";
    try {
        const newTodo = await todoItem.create({ task, todoList: listId })
        return res.status(200).json(newTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports.updateTodoItem = async (req, res) => {
    // Logic to update a todo item in a todo list

    const { itemId } = req.params
    const { task, isCompleted } = req.body
    console.log(task, isCompleted)
    try {
        const todo = await todoItem.findById(itemId)
        if (!todo) {
            return res.status(404).json({ error: 'Todo item not found in the specified list' });
        }
        const updateData = {}
        if (task != undefined) {
            updateData.task = task
        }
        if (isCompleted) {
            updateData.isCompleted = isCompleted
        }
        const updateTodo = await todoItem.findByIdAndUpdate(itemId, updateData, { new: true })
        return res.status(200).json(updateTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports.deleteTodoItem = async (req, res) => {
    const { itemId } = req.params
    try {
        const todo = await todoItem.findById(itemId)
        console.log(todo)
        if (!todo) {
            return res.status(404).json({ error: 'Todo item not found in the specified list' });
        }
        const deleteTodo = await todoItem.findByIdAndDelete(itemId)
        return res.status(200).json(deleteTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

