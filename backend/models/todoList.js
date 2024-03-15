const mongoose = require('mongoose');
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

module.exports = mongoose.model('todoList', todoListSchema);