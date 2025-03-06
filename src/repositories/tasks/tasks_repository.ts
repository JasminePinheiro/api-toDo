import { ITask, Task } from '../../models/TaskModel';

// camada de acesso dados
export abstract class AbsTasksRepository {
    abstract getAllTasks(): Promise<ITask[]>
    abstract createTask(task: ITask): Promise<ITask>;
    abstract updateTask(taskId: string, updatedTask: ITask): Promise<ITask>;
    abstract deleteTask(taskId: string): Promise<boolean>;
    abstract findTaskById(taskId: string): Promise<ITask | null>;
}

export class TasksRepository implements AbsTasksRepository {
    async getAllTasks(): Promise<ITask[]> {
        return await Task.find()
    }
    async createTask(task: ITask): Promise<ITask> {
        return await Task.create(task)
    }
    async updateTask(taskId: string, updatedTask: ITask): Promise<ITask> {
        return await Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
    }
    async deleteTask(taskId: string): Promise<boolean> {
         await Task.findByIdAndDelete(taskId)
         const deletedTask = await Task.findById(taskId).select('-__v').lean();
         return !deletedTask? true : false;
    }
    async findTaskById(taskId: string): Promise<ITask | null> {
        return await Task.findById(taskId)
    }

}