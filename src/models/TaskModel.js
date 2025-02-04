const mongoose = require('mongoose');

// colection
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    }
});