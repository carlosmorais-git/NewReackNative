//  Buscar dados

const express = require("express");
const router = express.Router();
const db = require("../db");

// Buscar todos os usuários do banco de dados
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM usuarios");
    res.json({
      status: "sucesso",
      mensagem: "Lista de usuários",
      usuarios: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Filtrar por maiores de idade
router.get("/maiores-por-idade", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM usuarios WHERE idade >= $1",
      [18],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "erro",
        code: 404,
        mensagem: "Nenhum usuário maior de idade encontrado",
      });
    }
    res.json({
      status: "sucesso",
      code: 200,
      mensagem: "Lista de usuários maiores de idade",
      usuarios: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários maiores de idade:", error);

    if (error.code === "ECONNREFUSED") {
      res.status(500).json({ error: "Erro de conexão com o banco de dados" });
    } else if (error.code === "EAGAIN") {
      res.status(500).json({ error: "Erro temporário, tente novamente" });
    } else {
      res
        .status(500)
        .json({ error: "Erro ao buscar usuários maiores de idade" });
    }
  }
});

// Cadastrar usuário
router.post("/", async (req, res) => {
  const { nome } = req.body;

  try {
    const resultado = await db.query(
      "INSERT INTO usuarios(nome) VALUES($1) RETURNING *",
      [nome],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({
      erro: "Erro interno",
    });
  }
});

module.exports = router;
