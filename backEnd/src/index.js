// 1. Carrega o dotenv primeiro
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env.db' }); 

import express from 'express';
import connectDB from '../config/dbConfig.js'; // Importa a função de conexão
import cors from 'cors';

// 2. Obtém as variáveis de ambiente com process.env
const PORT = process.env.PORT || 3000;

// 3. Inicializa o Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// 4. Definição de Rotas (Exemplo)
app.get('/', (req, res) => {
  res.send('API REST para o seu App de Produtividade está online!');
});

// 5. Inicia a Conexão e o Servidor
const startServer = async () => {
    // Validação da PORTA
    if (!PORT) {
        throw new Error('❌ Variável PORT não definida no arquivo .env.');
    }

    await connectDB(); // Conecta ao DB (se falhar, o processo é encerrado)
    
    app.listen(PORT, () => {
      //console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
    });
};

startServer();