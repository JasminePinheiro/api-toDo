import mongoose from "mongoose";
import dotenv from "dotenv";

// Conexão ao MongoDB
const connectToDB = async () => {
    const uri = process.env.MONGO_URI;

    try {
        await mongoose.connect(uri);
    
        console.log("MongoDB conectado");
    
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    }
}

export default connectToDB;
