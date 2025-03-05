"use strict";
const mongoose = require('mongoose');
// colection
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
});
module.exports = mongoose.model("Task", TaskSchema);
