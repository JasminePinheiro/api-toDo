import express, { Request, Response } from 'express';
import connectToDB from './config/database';
import dotenv from 'dotenv';
import { TaskController } from './controllers/TaskController';
import { TaskService } from './services/TaskService';
import { TasksRepository } from './repositories/tasks/tasks_repository';
import { UserController } from './controllers/user_controller';
import { UserService } from './services/user_service';
import { auth } from './middlewares/auth';

const main = () => {
    const app = express();
    app.use(express.json()); // Usar JSON como formato de entrada
    dotenv.config();

    // Conexão ao MongoDB
    console.log("Iniciando conexão ao MongoDB...");
    connectToDB();

    const port = 3000;

    //task
    const taskController = new TaskController(new TaskService(new TasksRepository()));

    app.get("/", auth, (req, res) => taskController.getAllTasks(req, res));
    app.post("/create", auth, (req, res) => taskController.createTask(req, res));
    app.put('/:id', auth, (req, res) => taskController.updateTask(req, res));
    app.delete('/:id', auth, (req, res) => taskController.deleteTask(req, res));
    app.get('/:id', auth, (req, res) => taskController.getTaskById(req, res));

    // user
    const userController = new UserController(new UserService());

    app.post("/signIn", (req: Request, res: Response) => {
        userController.signIn(req, res).catch((error) => {
            console.error("Erro ao processar signIn:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        });
    });
    app.post("/signUp", (req: Request, res: Response) => {
        userController.signUp(req, res).catch((error) => {
            console.error("Erro ao processar signUp:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        });
    });
    app.post("/refreshToken", (req: Request, res: Response) => {
        userController.refreshToken(req, res).catch((error) => {
            console.error("Erro ao processar refreshToken:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        });
    });
    app.listen(port, () =>
        console.log(`Servidor rodando em http://localhost:${port}`)
    );

}

main()

