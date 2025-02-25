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
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", TaskSchema)