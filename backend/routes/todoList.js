// @ts-nocheck
const express = require('express');
const router = express.Router();
const { getAllLists, createList, updateListName, deleteList } = require('../controller/todoList')
const { isLoggedIn } = require('../middleware/userMiddleware.js')
const { doesListExist, doesItemExist } = require('../middleware/todoItemMiddleware.js')



// Get all todo lists
router.get('/lists', isLoggedIn, getAllLists);

// Create a new todo list
router.post('/lists/create', isLoggedIn, createList);

// Update a todo list
router.put('/list/:listId', isLoggedIn, doesListExist, updateListName);

// Delete a todo list
router.delete('/list/:listId', isLoggedIn, doesListExist, deleteList);

module.exports = router;
