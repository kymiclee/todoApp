const express = require('express')

const router = express.Router()

router.get('/', getAll)

router.get('/:id',)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)
