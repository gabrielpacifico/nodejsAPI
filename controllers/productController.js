import productService from '../services/productService.js';

const service = new productService();

export default class productController {

    async getProducts(req, res) {
        try {
            const products = await service.getProducts();
            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar os produtos."
            });
        }
    }

    async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const searchProduct = await service.getProductById(productId);

            if (!searchProduct) {
                return res.status(404).json({
                    message: `Produto com ID: ${productId} não foi encontrado.`
                });
            }

            return res.status(200).json(searchProduct);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar o produto."
            });
        }
    }

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const productCreate = await service.createProduct(productData);

            if (!productCreate) {
                return res.status(400).json({
                    message: "Existem campos vazios, preencha-os."
                })
            }

            return res.status(201).json({
                message: "Produto criado com sucesso.",
                productCreate,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao criar o produto."
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const { productId } = req.params;
            const productData = req.body;
            const updateProduct = await service.updateProduct(
                productId,
                productData
            );

            if (!updateProduct) {
                return res.status(404).json({
                    message: "O produto não foi encontrado."
                });
            }

            return res.status(200).json({
                message: "Produto editado com sucesso.",
                updateProduct
            });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao editar o produto."
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { productId } = req.params;
            const deleteProduct = await service.deleteProduct(productId);

            if (!deleteProduct) {
                return res.status(404).json({
                    message: "O produto não foi encontrado."
                });
            }

            return res.status(200).json({
                message: "Produto deletado com sucesso.",
                deleteProduct
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Erro ao deletar o produto."
            });
        }
    }
}