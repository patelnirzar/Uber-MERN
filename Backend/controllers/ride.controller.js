import { getAddressCoordinates, getCaptainsInTheRadius } from "../services/maps.service.js";
import { createRide, getFare, confirmRide, startRide, endRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../model/ride.model.js";



const createRideController = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;
        const ride = await createRide(req.user, pickup, destination, vehicleType);
        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinates(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        // console.log(captainsInRadius)
        
        ride.otp = "";

        captainsInRadius.map((captain) => {
            console.log(captain.fullname.firstname + " " + captain.fullname.lastname)
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: ride
            })
        })
   
   
   
    } catch (error) {
        console.log(err)
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

const confirmRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({ rideId, captain: req.captain });
        console.log(ride)
        console.log(`after confirming ride ${ride.user.socketId}`)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

const startRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRide({ rideId, otp, captain: req.captain });

        console.log(ride);
        console.log("ride-started")

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const endRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export { createRideController, getRideFareController, confirmRideController, startRideController, endRideController };