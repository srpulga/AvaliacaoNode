-- Utilizando Postgres (docker)

CREATE DATABASE stocksystem;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Colocar extensão do uuid

-- Cria tabela de ingredientes
CREATE TABLE IF NOT EXISTS ingredient (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  unitmeasure VARCHAR NOT NULL,
  unitprice FLOAT NOT NULL
);

-- Cria tablea de produtos relacionado ao id dos ingredientes
CREATE TABLE IF NOT EXISTS product (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

-- Cria tabela de relacionamento ingrediente e produto / n -> n
CREATE TABLE IF NOT EXISTS ingredient_product (
  ingredient_id UUID,
  FOREIGN KEY(ingredient_id) REFERENCES ingredient(id),
  product_id UUID,
  FOREIGN KEY(product_id) REFERENCES product(id)
);

-- CREATE TABLE IF NOT EXISTS product (
--   id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
--   name VARCHAR NOT NULL,
--   price VARCHAR NOT NULL,
--   imagename VARCHAR NOT NULL,
--   image BYTEA NOT NULL,
--   ingredient_id UUID,
--   FOREIGN KEY(ingredient_id) REFERENCES ingredient(id)
-- );

-- Cria tabela dos usuarios

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  senha VARCHAR NOT NULL
);