import productRepository from '../repository/productRepository.js';

const repository = new productRepository();

export default class productService {

    async getProducts() {
        try {
            return await repository.getProducts();
        } catch (err) {
            throw new Error(`Erro ao exibir os produtos -> ${err.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const user = await repository.getProductById(productId);

            return user;
        } catch (err) {
            throw new Error(`Erro ao exibir o produto -> ${err.message}`);
        }
    }

    async getProductByName(productName) {
        try {
            const product = await repository.getProductByName(productName);
            
            return product;
        } catch (err) {
            throw new Error(`Erro ao exibir o produto -> ${err.message}`);
        }
    }

    async createProduct(productData) {
        try {
            const { ProductName, ProductCategory, ProductPrice } = productData;

            if (!ProductName || !ProductCategory || !ProductPrice) {
                return null;
            }

            const productCreated = await repository.createProduct(productData);
            return productCreated;
        } catch (err) {
            throw new Error(`Erro ao criar o produto -> ${err.message}`);
        }
    }

    async updateProduct(productId, productData) {
        try {
            const findProduct = await repository.getProductById(productId);

            if (!findProduct) {
                return null;
            }

            const productUpdated = await repository.updateProduct(productId, productData);
            return productUpdated;
        } catch (err) {
            throw new Error(`Erro ao editar o produto -> ${err.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const findProduct = await repository.getProductById(productId);

            if(!findProduct) {
                return null
            }

            const deletedProduct = await repository.deleteProduct(productId);
            return deletedProduct;
        } catch (err) {
            throw new Error(`Erro ao deletar o produto -> ${err.message}`);
        }
    }
}