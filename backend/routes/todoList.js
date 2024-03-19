// @ts-nocheck
const express = require('express');
const router = express.Router();
const { getAllLists, createList, updateListName, deleteList } = require('../controller/todoList')
const { isLoggedIn } = require('../middleware.js')


// Get all todo lists
router.get('/', getAllLists);

// Create a new todo list
router.post('/', createList);

// Update a todo list
router.put('/:listId', updateListName);

// Delete a todo list
router.delete('/:listId', deleteList);

module.exports = router;
