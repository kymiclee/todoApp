// @ts-nocheck
const express = require('express');
const router = express.Router();
const TodoList = require('../models/todoList');


// Create a new todo list
router.post('/', async (req, res) => {
    // So need to think how to do this 
    // we can use session id to get the user


    const { title, priority } = req.body
    const { listId } = req.params
    try {
        const newTodo = await todoItem.create({ title, priority, listId })
        return res.status(200).json(newTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

// Get all todo lists
router.get('/', async (req, res) => {
    // Logic to retrieve all todo lists
});

// Get a specific todo list
router.get('/:listId', async (req, res) => {
    // Logic to retrieve a specific todo list
});

// Update a todo list
router.put('/:listId', async (req, res) => {
    // Logic to update a todo list
});

// Delete a todo list
router.delete('/:listId', async (req, res) => {
    // Logic to delete a todo list
});

module.exports = router;
