import mongoose, { model } from 'mongoose';
import Item from './todoItem';
const { Schema } = mongoose;

const todoItemSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: 'List name cannot be empty'
    },
    isCompleted: {
        type: Boolean,
        default: 'false'
    },
    date: {
        type: Date,
        default: Date.now
    },
    itemlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
})

module.exports = mongoose.model('todoItem', todoItemSchema);