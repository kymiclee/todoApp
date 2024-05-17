const express = require('express');
const router = express.Router();
const { getAllItems, createTodoItem, updateTodoItem, deleteTodoItem } = require('../controller/todoItem')
const { isLoggedIn } = require('../middleware/userMiddleware.js')
const { doesListExist, doesItemExist } = require('../middleware/todoItemMiddleware.js')

// Get all todo items in a todo list
router.get('/items/:listId', isLoggedIn, doesListExist, getAllItems);

// Create a new todo item
router.post('/items/:listId', isLoggedIn, doesListExist, createTodoItem);

// Update a todo item in a todo list
router.put('/items/:listId/:itemId', isLoggedIn, doesListExist, doesItemExist, updateTodoItem);

// Delete a todo item from a todo list
router.delete('/items/:listId/:itemId', isLoggedIn, doesListExist, doesItemExist, deleteTodoItem);


module.exports = router;

