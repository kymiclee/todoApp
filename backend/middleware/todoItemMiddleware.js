const { CustomError } = require('./customError');
const todoList = require('../models/todoList');
const todoItem = require('../models/todoItem')

const doesListExist = async (req, res, next) => {
    const { listId } = req.params
    try {
        const listExists = await todoList.exists({ _id: listId });
        if (!listExists) {
            throw new CustomError(`List with ID ${listId} does not exist`, 404, 'TodoListError');
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
};
const doesItemExist = async (req, res, next) => {
    const { itemId } = req.params
    try {
        const itemExists = await todoItem.exists({ _id: itemId });
        if (!itemExists) {
            throw new CustomError(`Item with ID ${itemId} does not exist`, 404, 'TodoItemError');
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { doesListExist, doesItemExist };