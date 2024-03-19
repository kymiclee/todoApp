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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

// whenever i delete a todoList with findbyIdandDelete, it will use the  pre to delete all the 
// todo items from the list first with todoId then proceed to delete the list
// there is no findByIdAndDelete middleware but because it triggers findOneAndDelete, we can just use that

todoListSchema.pre('findOneAndDelete', async function (next) {
    console.log('pre schema')
    try {
        await todoItem.deleteMany({ todoList: this._id })
        next()
    } catch (error) {
        next(error)
    }
});

module.exports = mongoose.model('todoList', todoListSchema);