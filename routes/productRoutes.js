import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;