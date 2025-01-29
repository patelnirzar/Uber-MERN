import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } from '../controllers/map.controller.js';
import { query } from 'express-validator';

const mapsRouter = express.Router();

mapsRouter.get('/get-coordinates',
    query('address').isString().notEmpty().isLength({ min: 3 }),
    authUser, getCoordinates);

mapsRouter.get('/get-distance-time',
    query('origin').isString().notEmpty().isLength({ min: 3 }),
    query('destination').isString().notEmpty().isLength({ min: 3 }),
    authUser, getDistanceTime);

mapsRouter.get('/get-suggestions',
    query('input').isString().notEmpty().isLength({ min: 3 }),
    authUser, getAutoCompleteSuggestions);

export default mapsRouter;