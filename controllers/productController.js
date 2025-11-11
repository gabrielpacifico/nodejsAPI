import productService from '../services/productService.js';

const service = new productService();

export default class productController {

    async getProducts(req, res) {
            const products = await service.getProducts();
            return res.status(200).json(products);
    }

    async getProductById(req, res) {
            const { productId } = req.params;
            const searchProduct = await service.getProductById(productId);

            return res.status(200).json(searchProduct);
    }

    async getProductByName(req, res) {
            const { productName } = req.params;
            const searchProduct = await service.getProductByName(productName);

            return res.status(200).json(searchProduct);
    }

    async createProduct(req, res) {
            const productData = req.body;
            const productCreate = await service.createProduct(productData);

            return res.status(201).json({
                message: "Produto criado com sucesso.",
                productCreate,
            });
    }

    async updateProduct(req, res) {
            const { productId } = req.params;
            const productData = req.body;
            const updateProduct = await service.updateProduct(
                productId,
                productData
            );

            return res.status(200).json({
                message: "Produto editado com sucesso.",
                updateProduct
            });
    }

    async deleteProduct(req, res) {
            const { productId } = req.params;
            const deleteProduct = await service.deleteProduct(productId);

            return res.status(200).json({
                message: "Produto deletado com sucesso.",
                deleteProduct
            });
    }
}