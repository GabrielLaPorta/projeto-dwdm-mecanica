CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	id VARCHAR(60),
	nome VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL,
	senha VARCHAR(60)
);