const routes = require('express').routes;
const TaskController = require('../controllers/TaskController');

routes.get("/", TaskController.getAll)

export default routes;