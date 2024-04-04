// @ts-nocheck
const express = require('express');
const router = express.Router();
const { getAllLists, createList, updateListName, deleteList } = require('../controller/todoList')
const { isLoggedIn } = require('../middleware.js')


// Get all todo lists
router.get('/lists', isLoggedIn, getAllLists);

// Create a new todo list
router.post('/lists', isLoggedIn, createList);

// Update a todo list
router.put('/list/:listId', isLoggedIn, updateListName);

// Delete a todo list
router.delete('/list/:listId', isLoggedIn, deleteList);

module.exports = router;
