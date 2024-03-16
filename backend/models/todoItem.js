// @ts-nocheck
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoItemSchema = new Schema({
    task: {
        type: String,
        default: '',
        required: [true, 'Task name cannot be empty']
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: Number,
        default: 2,
        min: 1,
        max: 3
    },
    todoList: {
        type: Schema.Types.ObjectId,
        ref: 'todoList'
    }
})

todoItemSchema.pre('remove', function (next) {
    console.log('Query validate');
    next();
});

module.exports = mongoose.model('todoItem', todoItemSchema);