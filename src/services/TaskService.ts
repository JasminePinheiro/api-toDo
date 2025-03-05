import { ITask } from "../models/TaskModel";
import { TasksRepository } from "../repositories/tasks/tasks_repository";

export class TaskService {
    private tasksRepository: TasksRepository;


    constructor(tasksRepository: TasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async getAllTasks(): Promise<ITask[]> {
        return this.tasksRepository.getAllTasks();
    }
    async createTask(task: ITask): Promise<ITask> {
        return await this.tasksRepository.createTask(task);
    }
    async updateTask(taskId: string, updatedTask: ITask): Promise<ITask> {
        return this.tasksRepository.updateTask(taskId, updatedTask);
    }
    async deleteTask(taskId: string): Promise<boolean> {
        return this.tasksRepository.deleteTask(taskId);
    }
    async findTaskById(taskId: string): Promise<ITask | null> {
        return await this.tasksRepository.findTaskById(taskId);
    }
}