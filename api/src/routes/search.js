// Rotas de Busca/Pesquisa
const express = require("express");
const router = express.Router();

// Mock data - Itens pesquisáveis
const searchData = [
  {
    id: 1,
    title: "React Native",
    subtitle: "Framework mobile multiplataforma",
    category: "tecnologia",
    tags: ["mobile", "javascript", "react"],
  },
  {
    id: 2,
    title: "TypeScript",
    subtitle: "JavaScript tipado para maior segurança",
    category: "tecnologia",
    tags: ["typescript", "javascript", "tipos"],
  },
  {
    id: 3,
    title: "Expo",
    subtitle: "Plataforma para React Native",
    category: "tecnologia",
    tags: ["expo", "mobile", "react-native"],
  },
  {
    id: 4,
    title: "Node.js",
    subtitle: "Runtime JavaScript no servidor",
    category: "backend",
    tags: ["nodejs", "javascript", "backend"],
  },
  {
    id: 5,
    title: "Express",
    subtitle: "Framework web para Node.js",
    category: "backend",
    tags: ["express", "nodejs", "api"],
  },
  {
    id: 6,
    title: "PostgreSQL",
    subtitle: "Banco de dados relacional",
    category: "database",
    tags: ["postgresql", "sql", "database"],
  },
  {
    id: 7,
    title: "Git",
    subtitle: "Controle de versão distribuído",
    category: "ferramentas",
    tags: ["git", "versionamento", "github"],
  },
  {
    id: 8,
    title: "VS Code",
    subtitle: "Editor de código da Microsoft",
    category: "ferramentas",
    tags: ["vscode", "editor", "ide"],
  },
];

// GET - Buscar/pesquisar itens
router.get("/", (req, res) => {
  try {
    const { q, category } = req.query;
    let results = [...searchData];

    // Filtrar por query string
    if (q && q.trim() !== "") {
      const query = q.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Filtrar por categoria
    if (category) {
      results = results.filter((item) => item.category === category);
    }

    res.json({
      status: "success",
      message:
        results.length > 0
          ? "Resultados encontrados"
          : "Nenhum resultado encontrado",
      data: results,
      total: results.length,
      query: q || "",
      category: category || "all",
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
router.get("/categories", (req, res) => {
  try {
    const categories = [...new Set(searchData.map((item) => item.category))];
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
