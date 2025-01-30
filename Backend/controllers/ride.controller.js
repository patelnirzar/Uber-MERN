import { createRide, getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";


const createRideController = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;
        const ride = await createRide(req.user, pickup, destination, vehicleType);
        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getRideFareController = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;
        const fare = await getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createRideController, getRideFareController };