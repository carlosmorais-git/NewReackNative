// Rotas de Contatos
const express = require("express");
const router = express.Router();

// Mock data - Contatos
const contactsData = [
  {
    id: 1,
    icon: "email",
    type: "email",
    title: "Email",
    value: "contato@meuapp.com.br",
    action: "mailto:contato@meuapp.com.br",
    available: true,
  },
  {
    id: 2,
    icon: "phone",
    type: "phone",
    title: "Telefone",
    value: "+55 (11) 98765-4321",
    action: "tel:+5511987654321",
    available: true,
  },
  {
    id: 3,
    icon: "whatsapp",
    type: "whatsapp",
    title: "WhatsApp",
    value: "+55 (11) 98765-4321",
    action: "https://wa.me/5511987654321",
    available: true,
  },
  {
    id: 4,
    icon: "web",
    type: "website",
    title: "Website",
    value: "www.meuapp.com.br",
    action: "https://www.meuapp.com.br",
    available: true,
  },
  {
    id: 5,
    icon: "map-marker",
    type: "address",
    title: "Endereço",
    value: "São Paulo, SP - Brasil",
    action: "https://maps.google.com/?q=São+Paulo+SP",
    available: true,
  },
];

// Redes sociais
const socialNetworks = [
  {
    id: 1,
    name: "instagram",
    icon: "instagram",
    url: "https://instagram.com/meuapp",
    followers: "10.5k",
  },
  {
    id: 2,
    name: "facebook",
    icon: "facebook",
    url: "https://facebook.com/meuapp",
    followers: "8.2k",
  },
  {
    id: 3,
    name: "twitter",
    icon: "twitter",
    url: "https://twitter.com/meuapp",
    followers: "5.8k",
  },
  {
    id: 4,
    name: "linkedin",
    icon: "linkedin",
    url: "https://linkedin.com/company/meuapp",
    followers: "3.1k",
  },
];

// GET - Buscar todos os contatos
router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Contatos carregados com sucesso",
      data: {
        contacts: contactsData.filter((c) => c.available),
        socials: socialNetworks,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar contatos",
      data: { contacts: [], socials: [] },
    });
  }
});

// GET - Buscar apenas redes sociais
router.get("/socials", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Redes sociais carregadas",
      data: socialNetworks,
    });
  } catch (error) {
    console.error("Erro ao buscar redes sociais:", error);
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar redes sociais",
      data: [],
    });
  }
});

module.exports = router;
