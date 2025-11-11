import mongoose from 'mongoose';



const connectDB = async () => {
    // Obtém a URI carregada no process.env pelo index.js
    const MONGODB_URI = process.env.MONGODB_URI;

    // Validação da variável de ambiente CRUCIAL
    if (!MONGODB_URI) {
        throw new Error('❌ Variável MONGODB_URI não definida no arquivo .env.');
    }

    try {
        await mongoose.connect(MONGODB_URI);
        //console.log('✅ Conexão com MongoDB Atlas estabelecida com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB Atlas:', error.message);
        // Encerra o processo se a conexão falhar
        process.exit(1); 
    }
};

export default connectDB;