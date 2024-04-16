const express = require('express');
const router = express.Router();
const { getAllItems, createTodoItem, updateTodoItem, deleteTodoItem } = require('../controller/todoItem')
const { isLoggedIn } = require('../middleware.js')

// Get all todo items in a todo list
router.get('/items/:listId', getAllItems);

// Create a new todo item
router.post('/items/:listId', createTodoItem);

// Update a todo item in a todo list
router.put('/items/:listId/:itemId', updateTodoItem);

// Delete a todo item from a todo list
router.delete('/items/:listId/:itemId', deleteTodoItem);


module.exports = router;