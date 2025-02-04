"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./src/config/database")); // ou o caminho correto
const app = (0, express_1.default)();
console.log("Iniciando conexão ao MongoDB...");
(0, database_1.default)();
const port = 3000;
app.get('/', (_req, res) => {
    res.send('Hello World');
});
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
