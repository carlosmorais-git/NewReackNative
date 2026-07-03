// Rotas de Busca/Pesquisa
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Buscar todos os frameworks (filtro feito no frontend)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM frameworks ORDER BY id");

    res.json({
      status: "success",
      message:
        result.rows.length > 0
          ? "Resultados encontrados"
          : "Nenhum resultado encontrado",
      data: result.rows,
      total: result.rows.length,
    });
  } catch (error) {
    console.error("Erro ao buscar:", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao realizar busca",
      data: [],
      total: 0,
    });
  }
});

// GET - Buscar categorias disponíveis
router.get("/categories", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT DISTINCT category FROM frameworks ORDER BY category",
    );

    const categories = result.rows.map((row) => row.category);

    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({
      status: "error",
      data: [],
    });
  }
});

module.exports = router;
