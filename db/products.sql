CREATE TABLE products (
	productId SERIAL PRIMARY KEY,
	nome VARCHAR(60) NOT NULL,
	descricao VARCHAR(120),
	valor MONEY NOT NULL,
	categoryId INT NOT NULL,
	CONSTRAINT products_categoryId_fkey FOREIGN KEY (categoryId) REFERENCES product_category(categoryId)
);