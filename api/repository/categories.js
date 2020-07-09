const path = require("path");
const db = require(path.join(__dirname, "../../", "/api/dbConfig"));

class CategoryRepository {
    static async getAll() {
        return await db.query(
            "SELECT categoryid::varchar(255) AS id, nome FROM product_category ORDER BY id ASC"
        );
    }

    static async getById(id) {
        return await db.query(
            "SELECT categoryId AS id, nome FROM product_category WHERE categoryId = $1",
            [id]
        );
    }

    static async save(category) {
        return await db.query(
            "INSERT INTO product_category (nome) VALUES ($1)", 
            [category.nome]
        );
    }

    static async update(category) {
        return await db.query(
            "UPDATE product_category SET nome = $1 WHERE categoryId = $2", 
            [category.nome, category.id]
        );
    }

    static async delete(id) {
        return await db.query(
            "DELETE FROM product_category WHERE categoryId = $1;", 
            [id]
        );
    }
}

module.exports = CategoryRepository;