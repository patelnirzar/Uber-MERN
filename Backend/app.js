import cors from 'cors'
import express from 'express'
import connectDB from './db/db.js';
import dotenv from "dotenv";
import UserRouter from './routes/user.routes.js';
import captainRouter from './routes/captain.routes.js';
import cookieParser from 'cookie-parser';

const app = express()
connectDB();
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/users', UserRouter);
app.use('/captain', captainRouter);



app.get('/', (req, res) => {
    res.send(`Hello World`);
});

export default app;

