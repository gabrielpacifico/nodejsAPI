import userRepository from '../repository/userRepository.js';
import bcrypt from 'bcrypt';

const repository = new userRepository();

export default class userService {

    async getUsers() {
        try {
            return await repository.getUsers();
        } catch (err) {
            throw err;
        }
    }

    async getUserById(userId) {
        try {
            const user = await repository.getUserById(userId);

            if (!user) {
                const error = new Error("Não existe usuário com o ID informado.");
                error.statusCode = 400;
                throw error;
            }
            
            return user;
        } catch (err) {
            throw err;
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const user = await repository.getUserByEmail(userEmail);
            return user;
        } catch (err) {
            throw err;
        }
    }

    async createUser(userData) {
        try {
            const { Name, Email, Password } = userData;

            if (!Name || !Email || !Password) {
                const error = new Error("Campos Nome, Email ou Senha não preenchidos.")
                error.statusCode = 400;
                throw error;
            }

            const userCreated = await repository.createUser(userData);
            return userCreated;
        } catch (err) {
            throw err;
        }
    }

    async loginUser(userData) {
        try {
            const { Email, Password } = userData;

            if (!Email || !Password) {
                const error = new Error("Os campos E-mail e Senha são obrigatórios, preencha-os.");
                error.statusCode = 400;
                throw error;
            }

            const searchUser = await repository.getUserByEmail(Email);
            
            if(!searchUser) {
                const error = new Error("Não existe nenhum usuário cadastrado com esse E-mail.");
                error.statusCode = 400;
                throw error;
            }

            const isMatch = await bcrypt.compare(Password, searchUser.Password);

            if(!isMatch) {
                const error = new Error("Senha inválida.");
                error.statusCode = 400;
                throw error;
            }

            const userLogin = await repository.loginUser(userData);
            return userLogin;
        } catch (err) {
            throw err;
        }
    }

    async updateUser(userId, userData) {
        try {
            const findUser = await repository.getUserById(userId);

            if (!findUser) {
                const error = new Error("Não existe nenhum usuário com o ID informado.")
                error.statusCode = 400;
                throw error;
            }

            const userUpdated = await repository.updateUser(userId, userData);

            return userUpdated;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(userId) {
        try {
            const findUser = await repository.getUserById(userId);

            if (!findUser) {
                const error = new Error("Não é possível deletar, nenhum usuário com o ID informado.");
                error.statusCode = 400;
                throw error;
            }

            const deletedUser = await repository.deleteUser(userId);

            return deletedUser;
        } catch (err) {
            throw err;
        }
    }
}