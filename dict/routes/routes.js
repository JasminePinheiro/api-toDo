"use strict";
const express = require('express');
const routes = express.Router();
const TaskController = require('../controllers/TaskController');
routes.get("/", TaskController.getAllTasks);
routes.post("/criar", TaskController.createTask);
// routes.put('/:id', TaskController.updateTask);
// routes.delete('/:id', TaskController.deleteTask);
module.exports = routes;
