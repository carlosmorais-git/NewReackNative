//  Buscar dados

const express = require("express");
const router = express.Router();
const db = require("../db");

// Buscar o usuário pelo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({
      status: "sucesso",
      mensagem: "Usuário encontrado",
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

module.exports = router;
