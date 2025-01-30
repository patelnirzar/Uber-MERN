import express from 'express';
import { body } from 'express-validator';
import { createRideController, getRideFareController } from '../controllers/ride.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
import { query } from 'express-validator';

const rideRouter = express.Router();

rideRouter.get('/create',
    authUser,
    [
        body('pickup').isString().notEmpty().isLength({ min: 3 }).withMessage('Invalid origin'),
        body('destination').isString().notEmpty().isLength({ min: 3 }).withMessage('Invalid destination'),
        body('vehicleType').isString().notEmpty().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicleType')
    ],
    createRideController
)

rideRouter.get('/get-ride-fare', authUser,
    query('pickup').isString().notEmpty().isLength({ min: 3 }),
    query('destination').isString().notEmpty().isLength({ min: 3 }),
    getRideFareController
);



export default rideRouter;