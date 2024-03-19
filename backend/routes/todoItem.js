const express = require('express');
const router = express.Router();
const { getAllItems, createTodoItem, updateTodoItem, deleteTodoItem } = require('../controller/todoItem')
const { isLoggedIn } = require('../middleware.js')


// Get all todo items in a todo list
router.get('/:listId/items', getAllItems);

// Create a new todo item
router.post('/:listId/items', createTodoItem);

// Update a todo item in a todo list
router.put('/:listId/items/:itemId', updateTodoItem);

// Delete a todo item from a todo list
router.delete('/:listId/items/:itemId', deleteTodoItem);


module.exports = router;