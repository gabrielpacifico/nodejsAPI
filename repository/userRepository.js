import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class userRepository {
    async getUsers() {
        try {
            const users = await prisma.users.findMany({
                orderBy: { Id: 'asc'}
            });
            return users;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getUserById(userId) {
        try {
            const user = await prisma.users.findUnique({
                where: { Id: parseInt(userId) }
            });
            
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    async createUser(userData) {
        try {
            const { Password, ...rest } = userData;
            const pwdHash = await bcrypt.hash(Password, 8);

            const newUser = await prisma.users.create({
                data: {
                    ...rest,
                    Password: pwdHash
                }
            });

            return newUser;
        } catch (err) {
            throw new Error(`Erro ao criar um novo usuário -> ${err.message}`);
        }
    }

    async updateUser(userId, userData) {
        try {
            const updateUser = await prisma.users.update({
                where: { Id: parseInt(userId) },
                data:  { ...userData }
            });

            return updateUser;
        } catch (err) {
            throw new Error(`Erro ao editar o usuário -> ${err.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await prisma.users.delete({
                where: { Id: parseInt(userId)}
            });
            return deletedUser;
        } catch (err) {
            throw new Error(`Erro ao deletar o usuário -> ${err.message}`);
        }
    }
}