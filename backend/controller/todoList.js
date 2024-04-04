const express = require('express');
const todoList = require('../models/todoList');

module.exports.getAllLists = async (req, res) => {
    // Logic to retrieve all todo lists
    console.log('req.session.user:', req.session.user)
    // if (!req.session.user) {
    //     return res.status(200).json(null)
    // }
    const userId = req.session.user.id
    // const userId = "65fa0ca114a7231d1d2e1388"
    try {
        const todoLists = await todoList.find({ user: userId })
        return res.status(200).json(todoLists)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports.createList = async (req, res) => {
    var { title } = req.body

    const userId = req.session.user.id
    console.log(userId)
    // const userId = "65fa0ca114a7231d1d2e1388"
    if (title == "") {
        const count = todoList.countDocuments({ user: userId })
        title = `Todo List ${count}`
    }
    // const userId = "65fa1861cdd084c686bbb713"
    try {
        const newList = await todoList.create({ title, user: userId })
        return res.status(200).json(newList)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports.updateListName = async (req, res) => {
    // Logic to update a todo list
    const updateData = req.body
    const { listId } = req.params

    try {
        const list = await todoList.findById(listId)
        if (!list) {
            return res.status(400).json('error: List was not found')
        }
        const updatedList = await todoList.findByIdAndUpdate(listId, updateData, { new: true })
        return res.status(200).json(updatedList)
    } catch (error) {
        return res.status(400).message({ error: error.message })
    }
}

module.exports.deleteList = async (req, res) => {
    // Logic to delete a todo list
    const { listId } = req.params
    try {
        const list = await todoList.findById(listId)
        if (!list) {
            return res.status(400).json('error: List was not found')
        }
        console.log("about to run find By and delete")
        await todoList.findByIdAndDelete(listId, { new: true })
        return res.status(200).json({ message: 'Todo list and associated items deleted successfully' });
    } catch (error) {
        return res.status(400).message({ error: error.message })
    }
}

