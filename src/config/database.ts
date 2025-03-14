import mongoose from "mongoose";

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
