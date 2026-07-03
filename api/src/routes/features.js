// Rotas de Features (para tela Home)
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Buscar todas as features
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM features WHERE active = true ORDER BY id",
    );

    res.json({
      status: "success",
      message: "Features carregadas com sucesso",
      data: result.rows,
      total: result.rows.length,
    });
  } catch (error) {
    console.error("Erro ao buscar features:", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar features",
      data: [],
    });
  }
});

// GET - Buscar feature por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM features WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Feature não encontrada",
        data: null,
      });
    }

    res.json({
      status: "success",
      message: "Feature encontrada",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar feature:", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar feature",
      data: null,
    });
  }
});

module.exports = router;
