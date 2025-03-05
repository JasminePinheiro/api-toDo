"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Task = require('../models/TaskModel');
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasksList = yield Task.find();
        if (!tasksList) {
            return res.status(404).send({ message: 'No tasks found.' });
        }
        return res.status(200).send(tasksList);
    }
    catch (err) {
        const error = err;
        res.status(500).send({ error: error.message });
    }
});
// Função para criar uma nova tarefa
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dados recebidos:', req.body);
    const task = req.body;
    if (!task.title) {
        return res.status(400).send({ message: 'Title is required.' });
    }
    try {
        const newTask = yield Task.create(task);
        return res.status(201).json(newTask);
    }
    catch (err) {
        const error = err;
        return res.status(500).send({ error: error.message });
    }
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const updates = req.body;
    try {
        const updatedTask = yield Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found.' });
        }
        return res.status(200).json(updatedTask);
    }
    catch (err) {
        const error = err;
        return res.status(500).send({ error: error.message });
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const deletedTask = yield Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).send({ message: 'Task not found.' });
        }
        return res.status(200).json({ message: 'Task deleted successfully.' });
    }
    catch (err) {
        const error = err;
        return res.status(500).send({ error: error.message });
    }
});
module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
