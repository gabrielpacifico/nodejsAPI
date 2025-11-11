import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const prisma = new PrismaClient();

export default class userRepository {
    async getUsers() {
        try {
            const users = await prisma.users.findMany({
                orderBy: { Id: 'asc'}
            });
            return users;
        } catch (err) {
            throw err;
        }
    }

    async getUserById(userId) {
        try {
            const user = await prisma.users.findUnique({
                where: { Id: parseInt(userId) }
            });
            
            return user;
        } catch (err) {
            throw err;
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const user = await prisma.users.findUnique({
                where: { Email: userEmail }
            });

            return user;
        } catch (err) {
            console.log(err);
            throw err;
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
            throw err;
        }
    }

    async loginUser(userData) {
        try {
            const token = jwt.sign(
                { id: userData.Id },
                JWT_SECRET_KEY,
                { expiresIn: '2m' }
            );

            return token;

        } catch (err) {
            throw err;
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
            throw err;
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await prisma.users.delete({
                where: { Id: parseInt(userId)}
            });
            
            return deletedUser;
        } catch (err) {
            throw err;
        }
    }
}