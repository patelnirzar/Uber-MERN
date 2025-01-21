import express from 'express';
import { body } from 'express-validator';
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

const captainRouter = express.Router();

captainRouter.post('/register', [
    body('email', 'Email is required').isEmail().withMessage('Email is invalid'),
    body('password', 'Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname', 'Firstname is required').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('vehicle.capacity', 'Vehicle capacity is required').isLength({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.plate', 'License Plate is required').isLength({ min: 3 }).withMessage('License Plate must be at least 3 characters long'),
    body('vehicle.color', 'Color is required').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.vehicleType', 'vehicleType is required').isLength({ min: 3 }).withMessage('vehicleType must be at least 3 characters long'),
], registerCaptain);

captainRouter.post('/login', [
    body('email', 'Email is required').isEmail().withMessage('Email is invalid'),
    body('password', 'Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], loginCaptain);

captainRouter.get('/profile', authCaptain, getCaptainProfile);
captainRouter.get('/logout', logoutCaptain);

export default captainRouter;