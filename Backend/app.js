import cors from 'cors'
import express from 'express'
import connectDB from './db/db.js';
import dotenv from "dotenv";
import UserRouter from './routes/user.routes.js';

const app = express()
connectDB();
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', UserRouter);



app.get('/', (req, res) => {
    res.send(`Hello World`);
});

export default app;

