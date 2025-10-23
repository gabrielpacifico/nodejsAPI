import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class productRepository {

    async getProducts() {
        try {
            const products = await prisma.products.findMany({
                orderBy: { Id: 'asc' }
            });
            return products;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getProductById(productId) {
        try {
            const product = await prisma.products.findUnique({
                where: { Id: parseInt(productId) }
            });

            return product;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getProductByName(productName) {
        try {
            const product = await prisma.products.findMany({
                where: {
                    ProductName: { 
                        contains: productName,
                        mode: 'insensitive'
                    }
                }
            });

            return product;
        } catch (err) {
            throw new Error(err);
        }
    }

    async createProduct(productData) {
        try {
            const newProduct = await prisma.products.create({
                data: { ...productData }
            });

            return newProduct;
        } catch (err) {
            throw new Error(`Erro ao criar um novo produto -> ${err.message}`);
        }
    }

    async updateProduct(productId, productData) {
        try {
            const updateProduct = await prisma.products.update({
                where: { Id: parseInt(productId) },
                data: { ...productData }
            });

            return updateProduct;
        } catch (err) {
            throw new Error(`Erro ao editar o produto -> ${err.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await prisma.products.delete({
                where: { Id: parseInt(productId) }
            });

            return deletedProduct;
        } catch (err) {
            throw new Error(`Erro ao deletar o produto -> ${err.message}`);
        }
    }
}