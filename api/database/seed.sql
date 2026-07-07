-- Populando usuários para testes rode o comando:
-- $env:PGPASSWORD = "4580"; $env:PGCLIENTENCODING = "UTF8"; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d base_native -f database/seed.sql
-- (PGCLIENTENCODING=UTF8 evita que acentos sejam corrompidos pelo codepage do terminal do Windows)

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
    -- senha: 123456 (hash bcrypt)
    '$2b$10$vO1SvZ9Us7k/eiad6uBOIuq7uLXKvWKDYqv5RoaCGj1/N0pnRiONe',
    '(32) 99999-9999',
    'https://carlos.dev',
    'https://linkedin.com/in/carlos',
    'Rua A, 100 - Muriaé/MG'
),
(
    'Maria',
    'maria@email.com',
    -- senha: 654321 (hash bcrypt)
    '$2b$10$UKg8ATiob628XaMeCfbAoOaldrs7UEzahtEePuIy0Qir8mnxqUTf2',
    '(32) 98888-8888',
    'https://maria.dev',
    'https://linkedin.com/in/maria',
    'Rua B, 200 - Muriaé/MG'
)
-- em caso de conflito de email, atualiza os dados (corrige encoding antigo, se houver)
ON CONFLICT (email) DO UPDATE SET
    nome = excluded.nome,
    senha = excluded.senha,
    phone = excluded.phone,
    website = excluded.website,
    linkedin = excluded.linkedin,
    address = excluded.address;

-- Populando Features para a tela Home
-- (limpa antes de inserir para o seed poder ser reaplicado sem duplicar linhas)
TRUNCATE TABLE features RESTART IDENTITY;

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
-- (limpa antes de inserir para o seed poder ser reaplicado sem duplicar linhas)
TRUNCATE TABLE frameworks RESTART IDENTITY;

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