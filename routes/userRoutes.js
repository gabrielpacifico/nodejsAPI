import express from "express";
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

router.post('/login', userController.loginUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.get('/searchEmail/:userEmail', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;