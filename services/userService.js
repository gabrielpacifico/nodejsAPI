import userRepository from '../repository/userRepository.js';

const repository = new userRepository();

export default class userService {

    async getUsers() {
        try {
            return await repository.getUsers();
        } catch (err) {
            throw new Error(`Erro ao exibir os usuários -> ${err.message}`);
        }
    }

    async getUserById(userId) {
        try {
            const user = await repository.getUserById(userId);

            return user;
        } catch (err) {
            throw new Error(`Erro ao exibir o usuário -> ${err.message}`);
        }
    }

    async createUser(userData) {
        try {
            const userCreated = await repository.createUser(userData);
            return userCreated;
        } catch (err) {
            throw new Error(`Erro ao criar o usuário -> ${err.message}`);
        }
    }

    async updateUser(userId, userData) {
        try {
            const findUser = await repository.getUserById(userId);
            
            if(!findUser) {
                return null;
            }

            const userUpdated = await repository.updateUser(userId, userData);

            return userUpdated;
        } catch (err) {
            throw new Error(`Erro ao editar o usuário -> ${err.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await repository.deleteUser(userId);

            if(!deletedUser) {
                throw new Error('Usuário com o id informado não existe.');
            }
            return deletedUser;
        } catch (err) {
            throw new Error(`Erro ao deletar o usuário -> ${err.message}`);
        }
    }
}