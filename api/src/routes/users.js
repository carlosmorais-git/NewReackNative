//  Buscar dados

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Login do usuário: valida email/senha e gera um token JWT
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      status: "erro",
      mensagem: "E-mail e senha são obrigatórios",
    });
  }

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ status: "erro", mensagem: "Credenciais inválidas" });
    }

    const usuario = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ status: "erro", mensagem: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    const { senha: _senha, ...usuarioSemSenha } = usuario;

    res.json({
      status: "sucesso",
      mensagem: "Login realizado com sucesso",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ status: "erro", mensagem: "Erro ao fazer login" });
  }
});

// Buscar o usuário logado
router.get("/usuario-logado", async (req, res) => {
  /**
   * Na rota de busca do usuário logado,
   * você pode extrair o token do cabeçalho Authorization e decodificá-lo para obter o ID do usuário.
   * Em seguida, você pode buscar os dados do usuário no banco de dados usando esse ID.
   */
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const { senha: _senha, ...usuarioSemSenha } = result.rows[0];

    res.json({
      status: "sucesso",
      mensagem: "Usuário encontrado",
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

module.exports = router;
