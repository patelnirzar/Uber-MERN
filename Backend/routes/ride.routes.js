import express from 'express';
import { body } from 'express-validator';
import {
    createRideController,
    getRideFareController,
    confirmRideController,
    startRideController,
    endRideController
} from '../controllers/ride.controller.js';
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';
import { query } from 'express-validator';

const rideRouter = express.Router();

rideRouter.post('/create',
    authUser,
    
        body('pickup').isString().notEmpty().isLength({ min: 3 }).withMessage('Invalid origin'),
        body('destination').isString().notEmpty().isLength({ min: 3 }).withMessage('Invalid destination'),
        body('vehicleType').isString().notEmpty().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicleType')
    ,
    createRideController
)

rideRouter.get('/get-ride-fare', authUser,
    query('pickup').isString().notEmpty().isLength({ min: 3 }),
    query('destination').isString().notEmpty().isLength({ min: 3 }),
    getRideFareController
);

rideRouter.post('/confirm', authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRideController
);

rideRouter.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRideController
)
    
rideRouter.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRideController
)


export default rideRouter;