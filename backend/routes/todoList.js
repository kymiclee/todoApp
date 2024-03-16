// @ts-nocheck
const express = require('express');
const router = express.Router();
const todoList = require('../models/todoList');


// Create a new todo list
router.post('/', async (req, res) => {
    // So need to think how to do this 
    // we can use session id to get the user

    const { title, priority } = req.body
    const { userId } = req.sessions._id
    try {
        const newList = await todoList.create({ title, priority, user: userId })
        return res.status(200).json(newList)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

// Get all todo lists
router.get('/', async (req, res) => {
    // Logic to retrieve all todo lists
    const { userId } = req.sessions._id
    try {
        const todoLists = await todoList.get({ user: userId })
        return res.status(200).json(userId)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

// // Get a specific todo list
// router.get('/:listId', async (req, res) => {
//     // Logic to retrieve a specific todo list

// });

// Update a todo list
router.put('/:listId', async (req, res) => {
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
});

// Delete a todo list
router.delete('/:listId', async (req, res) => {
    // Logic to delete a todo list
    const updateData = req.body
    const { listId } = req.params

    try {
        const list = await todoList.findById(listId)
        if (!list) {
            return res.status(400).json('error: List was not found')
        }

        const updatedList = await todoList.findByIdAndDelete(listId, { new: true })
        return res.status(200).json(updatedList)
    } catch (error) {
        return res.status(400).message({ error: error.message })
    }
});

module.exports = router;
