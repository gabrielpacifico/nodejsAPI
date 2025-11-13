import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default function auth (req, res, next) {
    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Acesso negado." });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET_KEY);
    } catch (err) {
        return res.status(401).json({ message: "Token inválido." });
    }

    next();
}