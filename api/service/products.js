const path = require("path");

const ProductsRepository = require(path.join(__dirname, "../../", "/api/repository/products"));

class ProductsService {
    static getAll() {
        try {
            return ProductsRepository.getAll();
        } catch (error) {
            return error;
        }
    }

    static getById(id) {
        try {
            return ProductsRepository.getById(id);
        } catch (error) {
            return error;
        }
    }

    static async save(data) {
        try {
            return await ProductsRepository.save(data);
        } catch (error) {
            return error;
        }
    }

    static async update(data) {
        try {
            return await ProductsRepository.update(data);
        } catch (error) {
            return error;
        }
    }

    static async delete(data) {
        try {
            return await ProductsRepository.delete(data);
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductsService;