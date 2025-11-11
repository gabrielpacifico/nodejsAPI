import userService from '../services/userService.js';

const service = new userService();

export default class UserController {

    async getUsers(req, res) {
            const users = await service.getUsers();
            return res.status(200).json(users);
    }

    async getUserById(req, res) {
            const { userId } = req.params;
            const searchUser = await service.getUserById(userId);

            return res.status(200).json(searchUser);
    }

    async getUserByEmail(req, res) {
            const { userEmail } = req.params;
            const searchUser = await service.getUserByEmail(userEmail);

            return res.status(200).json(searchUser);
    }

    async createUser(req, res) {
            const userData = req.body;
            const userCreate = await service.createUser(userData);

            return res.status(201).json({
                message: "Usuário criado com sucesso.",
                userCreate,
            });
    }

    async loginUser(req, res) {
            const userData = req.body;
            const userLogin = await service.loginUser(userData);
            
            return res.status(200).json({token: userLogin});
    }

    async updateUser(req, res) {
            const { userId } = req.params;
            const userData = req.body;
            const updateUser = await service.updateUser(
                userId,
                userData
            );

            return res.status(200).json({
                message: "Usuário editado com sucesso.",
                updateUser
            });
    }

    async deleteUser(req, res) {
            const { userId } = req.params;
            const deleteUser = await service.deleteUser(userId);

            return res.status(200).json({
                message: "Usuário deletado com sucesso.",
                deleteUser
            });
    }
}