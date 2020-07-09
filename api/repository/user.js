const path = require("path");
const db = require(path.join(__dirname, "../../", "/api/dbConfig"));

class UserRepository {
    static async findAuthenticatedUser(id, email) {
        return await db.query(
            "SELECT * FROM users WHERE id = $1 AND email = $2", 
            [id, email]
        );
    }

    static async userCount(email) {
        return await db.query(
            "SELECT count(1) AS rows FROM users WHERE email = $1", 
            [email]
        );
    }

    static async save(user) {
        return await db.query(
            "INSERT INTO users (nome, email, senha, id) VALUES ($1, $2, $3, $4)", 
            [user.nome, user.email, user.senha, user.id]
        );
    }
}

module.exports = UserRepository;