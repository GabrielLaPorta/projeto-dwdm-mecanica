const path = require("path");
const db = require(path.join(__dirname, "../../", "/api/dbConfig"));

class ProductsRepository {
    static async getAll() {
        return await db.query(
            "SELECT productid AS id, products.nome, descricao, valor::money::numeric::float8, categoryId::varchar(250), product_category.nome AS categoria FROM products INNER JOIN product_category USING(categoryId) ORDER BY id ASC"
        );
    }

    static async getById(id) {
        return await db.query(
            "SELECT productid AS id, nome, descricao, valor::money::numeric::float8, categoryId FROM products WHERE productid = $1",
            [id]
        );
    }

    static async save(product) {
        return await db.query(
            "INSERT INTO products (nome, descricao, valor, categoryId) VALUES ($1, $2, $3, $4)", 
            [product.nome, product.descricao, product.valor, product.categoryid]
        );
    }

    static async update(product) {
        return await db.query(
            "UPDATE products SET nome = $1, descricao = $2, valor = $3, categoryId = $4 WHERE productid = $5", 
            [product.nome, product.descricao, product.valor, product.categoryid, product.id]
        );
    }

    static async delete(id) {
        return await db.query(
            "DELETE FROM products WHERE productid = $1;", 
            [id]
        );
    }
}

module.exports = ProductsRepository;