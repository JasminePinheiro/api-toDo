const mongoose = require('mongoose');

// Conexão ao MongoDB
const connectToDB = async () => {

    try {
        await mongoose.connect(
            "mongodb+srv://jasminepinheiro14:123@cluster0.d2rik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB conectado");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    }
}

export default connectToDB;