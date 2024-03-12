import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const todoItemSchema = new Schema({
    task: {
        type: String,
        default: '',
        required: 'Task cannot be emptied'
    },
    isCompleted: {
        type: Boolean,
        default: 'false'
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
    }
})

module.exports = mongoose.model('todoItem', todoItemSchema);