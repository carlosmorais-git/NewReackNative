-- Pra criar primeira vez rode o comando:
-- $env:PGPASSWORD = "4580"; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d base_native -f database/schema.sql


-- Tabela de usuarios con relacionamento com contatos
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    website VARCHAR(100),
    linkedin VARCHAR(100),
    address VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Features
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    descricao TEXT,
    icon VARCHAR(50),
    title VARCHAR(100),
    color VARCHAR(7),
    active BOOLEAN,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Frameworks
CREATE TABLE IF NOT EXISTS frameworks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(255),
    category VARCHAR(50),
    tags TEXT[],
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);