import userService from '../services/userService.js';

const service = new userService();

export default class UserController {

    async getUsers(req, res) {
        try {
            const users = await service.getUsers();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar os usuários."
            });
        }
    }

    async getUserById(req, res) {
        try {
            const { userId } = req.params;
            const searchUser = await service.getUserById(userId);
            
            if(!searchUser) {
                return res.status(404).json({
                    message: `Usuário com ID: ${userId} não foi encontrado.`
                });
            }

            return res.status(200).json(searchUser);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar o usuário."
            });
        }
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            const userCreate = await service.createUser(userData);
            
            if(!userCreate) {
                return res.status(400).json({
                    message: "Existem campos vazios, preencha-os."
                })
            }
            return res.status(201).json({
                message: "Usuário criado com sucesso.",
                userCreate,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao criar o usuário."
            });            
        }
    }

    async updateUser(req, res) {
        try {
            const { userId } = req.params;
            const userData  = req.body;
            const updateUser = await service.updateUser(
                userId,
                userData
            );

            if(!updateUser) {
                return res.status(404).json({
                    message: "O usuário não foi encontrado."
                });
            }

            return res.status(200).json(updateUser);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao editar o usuário."
            });              
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            const deleteUser = await service.deleteUser(userId);

            if(!deleteUser) {
                return res.status(404).json({
                    message: "O usuário não foi encontrado."
                });
            }
            
            return res.status(200).json(deleteUser);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao deletar o usuário."
            });                
        }
    }
}