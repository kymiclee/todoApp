const express = require('express');
const todoList = require('../models/todoList');

module.exports.getAllLists = async (req, res) => {
    // Logic to retrieve all todo lists
    console.log('req.session.user:', req.session.user)
    const userId = req.session.user.id
    // const userId = "65fa0ca114a7231d1d2e1388"
    try {
        const todoLists = await todoList.find({ user: userId })
        return res.status(200).json(todoLists)
    } catch (error) {
        next(new CustomError(error.message, 500, 'todoList'))
    }
}


module.exports.createList = async (req, res) => {
    var { title } = req.body
    const userId = req.session.user.id
    console.log(userId)
    // const userId = "65fa1861cdd084c686bbb713"
    try {
        const newList = await todoList.create({ title, user: userId })
        return res.status(200).json(newList)
    } catch (error) {
        next(new CustomError(error.message, 500, 'todoList'))
    }
}

module.exports.updateListName = async (req, res) => {
    // Logic to update a todo list
    const { title } = req.body
    const { listId } = req.params
    console.log('listId from backend:', listId)
    console.log('data send to backend: ', title)
    try {
        const updatedList = await todoList.findByIdAndUpdate(listId, { title }, { new: true })
        return res.status(200).json(updatedList)
    } catch (error) {
        next(new CustomError(error.message, 500, 'todoList'))
    }
}

module.exports.deleteList = async (req, res) => {
    // Logic to delete a todo list
    const { listId } = req.params
    try {
        console.log("about to run find By and delete")
        await todoList.findByIdAndDelete(listId, { new: true })
        return res.status(200).json({ message: 'Todo list and associated items deleted successfully' });
    } catch (error) {
        next(new CustomError(error.message, 500, 'todoList'))
    }
}

