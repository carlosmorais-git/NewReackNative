/**
 * Service para buscar contatos da API
 */
export const getContacts = async () => {
  // Retorna dados mock como fallback
  return {
    contacts: [
      {
        id: 1,
        icon: "email",
        type: "email",
        title: "Email",
        value: "contato@exemplo.com",
        action: "mailto:contato@exemplo.com",
        available: true,
      },
      {
        id: 2,
        icon: "phone",
        type: "phone",
        title: "Telefone",
        value: "+55 (11) 99999-9999",
        action: "tel:+5511999999999",
        available: true,
      },
      {
        id: 3,
        icon: "whatsapp",
        type: "whatsapp",
        title: "WhatsApp",
        value: "+55 (11) 99999-9999",
        action: "https://wa.me/5511999999999",
        available: true,
      },
      {
        id: 4,
        icon: "web",
        type: "website",
        title: "Website",
        value: "www.exemplo.com",
        action: "https://www.exemplo.com",
        available: true,
      },
    ],
    socials: [
      { id: 1, name: "instagram", icon: "instagram", url: "", followers: "" },
      { id: 2, name: "facebook", icon: "facebook", url: "", followers: "" },
      { id: 3, name: "twitter", icon: "twitter", url: "", followers: "" },
      { id: 4, name: "linkedin", icon: "linkedin", url: "", followers: "" },
    ],
  };
};
