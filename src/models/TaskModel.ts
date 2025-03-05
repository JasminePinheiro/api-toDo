// const mongoose = require('mongoose');

// // colection


// // module.exports = mongoose.model("Task", TaskSchema)
// exports = mongoose.model("Task", TaskSchema)

import { Document, model, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
}
const TaskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});


export const Task = model<ITask>('Task', TaskSchema);
