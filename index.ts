import express from 'express';
import connectToDB from './src/config/database'; // ou o caminho correto

const app = express();

console.log("Iniciando conexão ao MongoDB...");
connectToDB(); 

const port = 3000;

app.get('/', (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Hello World');
});

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);