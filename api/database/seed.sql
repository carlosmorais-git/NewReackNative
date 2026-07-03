-- Populando usuários para testes rode o comando:
-- $env:PGPASSWORD = "4580"; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d base_native -f database/seed.sql

INSERT INTO usuarios (
    nome,
    email,
    senha,
    phone,
    website,
    linkedin,
    address
)
VALUES
(
    'Carlos',
    'carlos@email.com',
    '123456',
    '(32) 99999-9999',
    'https://carlos.dev',
    'https://linkedin.com/in/carlos',
    'Rua A, 100 - Muriaé/MG'
),
(
    'Maria',
    'maria@email.com',
    '654321',
    '(32) 98888-8888',
    'https://maria.dev',
    'https://linkedin.com/in/maria',
    'Rua B, 200 - Muriaé/MG'
)
-- em caso de conflito de email, não insere o registro duplicado
ON CONFLICT (email) DO NOTHING;

-- Populando Features para a tela Home

INSERT INTO features (
    descricao,
    icon,
    title,
    color,
    active
)
VALUES
(
    'Comece seu projeto em minutos',
    'rocket-launch',
    'Início Rápido',
    '#6C63FF',
    true
),
(
    'Dark mode e light mode',
    'palette',
    'Temas',
    '#FF6584',
    true
),
(
    'Estrutura organizada',
    'code-tags',
    'Código Limpo',
    '#2ECC71',
    true
),
(
    'Tabs e Stack prontos',
    'gesture-swipe',
    'Navegação',
    '#F39C12',
    true
),
(
    'Backend integrado',
    'api',
    'API Conectada',
    '#3498DB',
    true
),
(
    '100% tipado',
    'shield-check',
    'TypeScript',
    '#9B59B6',
    true
);

-- Populando Frameworks para a tela de Busca

INSERT INTO frameworks (
    title,
    subtitle,
    category,
    tags
)
VALUES
(
    'React Native',
    'Framework mobile multiplataforma',
    'tecnologia',
    ARRAY['mobile', 'javascript', 'react']
),
(
    'TypeScript',
    'JavaScript tipado para maior segurança',
    'tecnologia',
    ARRAY['typescript', 'javascript', 'tipos']
),
(
    'Expo',
    'Plataforma para React Native',
    'tecnologia',
    ARRAY['expo', 'mobile', 'react-native']
),
(
    'Node.js',
    'Runtime JavaScript no servidor',
    'backend',
    ARRAY['nodejs', 'javascript', 'backend']
),
(
    'Express',
    'Framework web para Node.js',
    'backend',
    ARRAY['express', 'nodejs', 'api']
),
(
    'PostgreSQL',
    'Banco de dados relacional',
    'database',
    ARRAY['postgresql', 'sql', 'database']
),
(
    'Git',
    'Controle de versão distribuído',
    'ferramentas',
    ARRAY['git', 'versionamento', 'github']
),
(
    'VS Code',
    'Editor de código da Microsoft',
    'ferramentas',
    ARRAY['vscode', 'editor', 'ide']
); 