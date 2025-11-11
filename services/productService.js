import productRepository from '../repository/productRepository.js';

const repository = new productRepository();

export default class productService {

    async getProducts() {
        try {
            const products = await repository.getProducts();
            return products;
        } catch (err) {
            throw err;
        }
    }

    async getProductById(productId) {
        try {
            const product = await repository.getProductById(productId);

            if (!product) {
                const error = new Error("Não existe produto com o ID informado.");
                error.statusCode = 400;
                throw error;
            }

            return product;
        } catch (err) {
            throw err;
        }
    }

    async getProductByName(productName) {
        try {
            const product = await repository.getProductByName(productName);

            if (!product) {
                const error = new Error("Não existe nenhum usuário com o nome informado.");
                error.status = 404;
                throw error;
            }

            return product;
        } catch (err) {
            throw err;
        }
    }

    async createProduct(productData) {
        try {
            const { ProductName, ProductCategory, ProductPrice } = productData;

            if (!ProductName || !ProductCategory || !ProductPrice) {
                const error = new Error("Campos Nome, Categoria ou preço não preenchidos.");
                error.statusCode = 404;
                throw error;
            }

            const productCreated = await repository.createProduct(productData);
            return productCreated;
        } catch (err) {
            throw err;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const findProduct = await repository.getProductById(productId);

            if (!findProduct) {
                const error = new Error("Não existe produto com o ID informado.");
                error.statusCode = 404;
                throw error;
            }

            const productUpdated = await repository.updateProduct(productId, productData);
            return productUpdated;
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(productId) {
        try {
            const findProduct = await repository.getProductById(productId);

            if (!findProduct) {
                const error = new Error("Não é possível deletar, não existe produto com o ID informado.");
                error.statusCode = 404;
                throw error;
            }

            const deletedProduct = await repository.deleteProduct(productId);
            return deletedProduct;
        } catch (err) {
            throw err;
        }
    }
}