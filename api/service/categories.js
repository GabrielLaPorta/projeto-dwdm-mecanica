const path = require("path");

const CategoryRepository = require(path.join(__dirname, "../../", "/api/repository/categories"));

class CategoryService {
    static getAll() {
        try {
            return CategoryRepository.getAll();
        } catch (error) {
            return error;
        }
    }

    static getById(id) {
        try {
            return CategoryRepository.getById(id);
        } catch (error) {
            return error;
        }
    }

    static async save(data) {
        try {
            return await CategoryRepository.save(data);
        } catch (error) {
            return error;
        }
    }

    static async update(data) {
        try {
            return await CategoryRepository.update(data);
        } catch (error) {
            return error;
        }
    }

    static async delete(data) {
        try {
            return await CategoryRepository.delete(data);
        } catch (error) {
            return error;
        }
    }
}

module.exports = CategoryService;