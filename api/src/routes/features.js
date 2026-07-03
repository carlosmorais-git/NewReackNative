// Rotas de Features (para tela Home)
const express = require("express");
const router = express.Router();

// Mock data - Features para a tela Home
const featuresData = [
  {
    id: 1,
    icon: "rocket-launch",
    title: "Início Rápido",
    description: "Comece seu projeto em minutos",
    color: "#6C63FF",
    active: true,
  },
  {
    id: 2,
    icon: "palette",
    title: "Temas",
    description: "Dark mode e light mode",
    color: "#FF6584",
    active: true,
  },
  {
    id: 3,
    icon: "code-tags",
    title: "Código Limpo",
    description: "Estrutura organizada",
    color: "#2ECC71",
    active: true,
  },
  {
    id: 4,
    icon: "gesture-swipe",
    title: "Navegação",
    description: "Tabs e Stack prontos",
    color: "#F39C12",
    active: true,
  },
  {
    id: 5,
    icon: "api",
    title: "API Conectada",
    description: "Backend integrado",
    color: "#3498DB",
    active: true,
  },
  {
    id: 6,
    icon: "shield-check",
    title: "TypeScript",
    description: "100% tipado",
    color: "#9B59B6",
    active: true,
  },
];

// GET - Buscar todas as features
router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Features carregadas com sucesso",
      data: featuresData.filter((f) => f.active),
      total: featuresData.filter((f) => f.active).length,
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
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const feature = featuresData.find((f) => f.id === parseInt(id));

    if (!feature) {
      return res.status(404).json({
        status: "error",
        message: "Feature não encontrada",
        data: null,
      });
    }

    res.json({
      status: "success",
      message: "Feature encontrada",
      data: feature,
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
