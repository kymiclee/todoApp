// @ts-nocheck
const mongoose = require('mongoose');
const todoItem = require('./todoItem');
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: [true, 'List name cannot be empty']
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

// whenever i delete a todoList with findbyIdandDelete, it will use the  pre to delete all the 
// todo items from the list first with todoId then proceed to delete the list
todoListSchema.pre('findbyIdandDelete', function (next) {
    try {
        todoItem.remove({ todoList: this._id }).exec()
        next()
    } catch (error) {
        next(error)
    }

});

module.exports = mongoose.model('todoList', todoListSchema);