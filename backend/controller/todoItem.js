
const express = require('express');
const todoItem = require('../models/todoItem')

const { CustomError } = require("../middleware/customError");

module.exports.getAllItems = async (req, res, next) => {
    try {
        const { listId } = req.params
        console.log(listId)
        const userId = req.session.user.id
        // const userId = "65fa0ca114a7231d1d2e1388"

        const todoItems = await todoItem.find({ todoList: listId })
        console.log('todoItems: ', todoItems)
        return res.status(200).json(todoItems)

    } catch (error) {
        next(new CustomError(error.message, 500, 'TodoItemError'))
    }
}


module.exports.createTodoItem = async (req, res, next) => {
    const { task } = req.body
    const { listId } = req.params
    // const listId = "6606429f24ba990c28fa4dbe";
    try {
        const newTodo = await todoItem.create({ task, todoList: listId })
        return res.status(200).json(newTodo)
    } catch (error) {
        next(new CustomError(error.message, 500, 'TodoItemError'))
    }
}

module.exports.updateTodoItem = async (req, res, next) => {
    // Logic to update a todo item in a todo list

    const { itemId } = req.params
    const { task, isCompleted } = req.body
    console.log(task, isCompleted)
    try {
        const todo = await todoItem.findById(itemId)
        const updateData = {}
        if (task != undefined) {
            updateData.task = task
        }
        if (isCompleted != undefined) {
            updateData.isCompleted = isCompleted
        }
        const updateTodo = await todoItem.findByIdAndUpdate(itemId, updateData, { new: true })
        return res.status(200).json(updateTodo)
    } catch (error) {
        next(new CustomError(error.message, 500, 'TodoItemError'))
    }
}


module.exports.deleteTodoItem = async (req, res, next) => {
    const { itemId } = req.params
    try {
        const todo = await todoItem.findById(itemId)
        console.log(todo)
        const deleteTodo = await todoItem.findByIdAndDelete(itemId)
        return res.status(200).json(deleteTodo)
    } catch (error) {
        next(new CustomError(error.message, 500, 'TodoItemError'))
    }
}

