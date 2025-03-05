import express from 'express';
import connectToDB from './config/database';
import { routes } from './routes/routes';
import dotenv from 'dotenv';

const app = express();
app.use(express.json()); // Usar JSON como formato de entrada
dotenv.config();

// Conexão ao MongoDB
console.log("Iniciando conexão ao MongoDB...");
connectToDB(); 

const port = 3000;

// app.get('/', (_req: any, res: { send: (arg0: string) => void; }) => {
//     res.send('Hello World');
// }); 

app.use('/', routes);  // Rota para produtos


app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);