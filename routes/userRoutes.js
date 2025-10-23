import express from "express";
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;