// Criar a conexão

require("dotenv").config();

/**
 * Importando o módulo 'pg' para conectar ao banco de dados PostgreSQL
 * O módulo 'pg' fornece uma interface para interagir com o banco de dados PostgreSQL
 * */
const { Pool } = require("pg");

// Criando uma instância do Pool de conexões com as configurações do banco de dados
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
