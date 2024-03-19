const express = require('express');
const router = express.Router();
const todoItem = require('../models/todoItem');

// Create a new todo item
// Test listId : 5e9f883103e2566b80778f6f
router.post('/:listId/items', async (req, res) => {
    const { task, priority } = req.body
    const { listId } = req.params
    try {
        const newTodo = await todoItem.create({ task, priority, todoList: listId })
        return res.status(200).json(newTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

// Get all todo items in a todo list
router.get('/:listId/items', async (req, res) => {
    const { listId } = req.params
    try {
        const allTodo = await todoItem.find({ todoList: listId })
        return res.status(200).json(allTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

});

// Update a todo item in a todo list
router.put('/:listId/items/:itemId', async (req, res) => {
    // Logic to update a todo item in a todo list
    const { listId, itemId } = req.params
    const updatedData = req.body
    console.log(listId, itemId)
    try {
        const todo = await todoItem.findById(itemId);
        if (!todo) {
            return res.status(404).json({ error: 'Todo item not found in the specified list' });
        }
        const updateTodo = await todoItem.findByIdAndUpdate(itemId, updatedData, { new: true })
        return res.status(200).json(updateTodo)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

// Delete a todo item from a todo list
router.delete('/:listId/items/:itemId', async (req, res) => {
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
});


module.exports = router;