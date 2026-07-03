// Servidor da API RESTful em Node.js usando Express

// Configuração do ambiente
require("dotenv").config();

// Importando as dependências
/**
 * Módulos necessários para o funcionamento da API
 * express: framework para criar o servidor
 * cors: middleware para habilitar o CORS (Cross-Origin Resource Sharing)
 *      - Permite que a API seja acessada de diferentes origens
 *      - Metodos HTTP suportados: GET, POST, PUT, DELETE, etc.
 * usersRouter: roteador para gerenciar as rotas de usuários
 */
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");
const featuresRouter = require("./routes/features");
const contactsRouter = require("./routes/contacts");
const searchRouter = require("./routes/search");

// Criando uma instância do aplicativo Express
const app = express();
const db = require("./db");

/**
 * Habilitando o CORS para permitir requisições de diferentes origens,
 * e o middleware para interpretar requisições com corpo em formato JSON
 */
app.use(cors());
app.use(express.json());

// Rota principal da API, que retorna uma mensagem de funcionamento
app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando!",
  });
});

app.get("/contas", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM contas");
    res.json({
      status: "sucesso",
      contas: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rotas de usuários
app.use("/usuarios", usersRouter);

// Rotas de features (Home)
app.use("/api/features", featuresRouter);

// Rotas de contatos
app.use("/api/contacts", contactsRouter);

// Rotas de busca
app.use("/api/search", searchRouter);

/**
 * Definindo a porta do servidor,
 * que pode ser configurada através de uma variável de ambiente
 * ou padrão para 3003
 */
const PORT = process.env.PORT || 3003;
console.log("Banco de dados:", process.env.DB_NAME);
// Iniciando o servidor na porta definida e exibindo uma mensagem no console
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
