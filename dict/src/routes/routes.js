"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require('express').routes;
const TaskController = require('../controllers/TaskController');
routes.get("/", TaskController.getAll);
exports.default = routes;
