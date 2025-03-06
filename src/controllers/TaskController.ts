import { Task } from "../models/TaskModel"
import { TasksRepository } from "../repositories/tasks/tasks_repository"
import { TaskService } from "../services/TaskService";

// camada de apresentação
export class TaskController {
    
    async getAllTasks(req: any, res: any) {
        
        try {
            // Cria uma instância do TaskService, passando uma nova instância de TasksRepository como parâmetro
            const taskService = new TaskService(new TasksRepository());
            const tasksList = await taskService.getAllTasks();
            if (!tasksList) {
                return res.status(404).send({ message: 'No tasks found.' })
            }
            return res.status(200).send(tasksList)
        } catch (err) {
            const error = err as Error
            res.status(500).send({ error: error.message })
        }
    }

    // Função para criar uma nova tarefa
    async createTask(req: any, res: any) {

        console.log('Dados recebidos:', req.body);

        const task = req.body;

        if (!task.title) {
            return res.status(400).send({ message: 'Title is required.' });
        }

        try {
            const taskService = new TaskService(new TasksRepository());
            const newTask = await taskService.createTask(task)
            return res.status(201).json(newTask);
        } catch (err) {
            const error = err as Error;
            return res.status(500).send({ error: error.message });
        }
    };

    async updateTask(req: any, res: any) {
        
        const taskId = req.params.id;
        const updates = req.body;

        try {
            const taskService = new TaskService(new TasksRepository());
            const updatedTask = await taskService.updateTask(taskId, updates);

            if (!updatedTask) {
                return res.status(404).send({ message: 'Task not found.' });
            }

            return res.status(200).json(updatedTask);
        } catch (err) {
            const error = err as Error;
            return res.status(500).send({ error: error.message });
        }
    };

    async deleteTask(req: any, res: any) {
        const taskId = req.params.id;

        try {
            const taskService = new TaskService(new TasksRepository());
            const deletedTask = await taskService.deleteTask(taskId);

            if (deletedTask) {
                return res.status(200).json({ message: 'Task deleted successfully.', deleted: true });
            }

            return res.status(404).send({ message: 'Task not found.', deleted: false });
        } catch (err) {
            const error = err as Error;
            return res.status(500).send({ error: error.message });
        }
    };

    async getTaskById(req: any, res: any) {
        const taskId = req.params.id;

        try {
            const task = await Task.findById(taskId).select('-__v').lean();

            if (!task) {
                return res.status(404).send({ message: 'Task not found.' });
            }
            const response = {
                ...task,
                date: Date.now().toString()
            }
            return res.status(200).json(response);

        } catch (err) {
            const error = err as Error;
            return res.status(500).send({ error: error.message });
        }
    }

}
