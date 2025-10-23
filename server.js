import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}...`);
});