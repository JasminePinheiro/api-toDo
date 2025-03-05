const express = require('express');

export const routes = express.Router();
import { TaskController } from '../controllers/TaskController';
import { validateTaskCreation } from '../middlewares/TaskMiddlewares';
const taskController = new TaskController();

routes.get("/", taskController.getAllTasks);
routes.post("/create", validateTaskCreation, taskController.createTask);
routes.put('/:id', taskController.updateTask);
routes.delete('/:id', taskController.deleteTask);
routes.get('/:id', taskController.getTaskById);
