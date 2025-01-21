import express from 'express';
import {body} from 'express-validator';
import { registerUser } from '../controllers/user.controller.js';

const UserRouter = express.Router();

UserRouter.post('/register', [
    body('email', 'Email is required').isEmail().withMessage('Email is invalid'),
    body('password', 'Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname', 'Firstname is required').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
], registerUser);

export default UserRouter;