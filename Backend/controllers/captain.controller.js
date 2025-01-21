import { Captain } from "../model/captain.model.js";
import { validationResult } from 'express-validator';
import BlacklistToken from "../model/blacklistToken.model.js";
import { createCaptain } from "../services/captain.service.js";

const registerCaptain = async (req, res) => { 
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const captainExists = await Captain.findOne({ email });
    if (captainExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashPassword = await Captain.hashPassword(password);


    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({
        token, captain: {
            firstname: captain.fullname.firstname,
            lastname: captain.fullname.lastname,
            email: captain.email,
            color: captain.vehicle.color,
            plate: captain.vehicle.plate,
            capacity: captain.vehicle.capacity,
            vehicleType: captain.vehicle.vehicleType
        }
    });
}

const loginCaptain = async (req, res) => { 
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select('+password');

    if (!captain){
        return res.status(404).json({ message: 'Captain not found' });
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token, { httpOnly: true });

    return res.status(201).json({
        token, captain: {
            firstname: captain.fullname.firstname,
            lastname: captain.fullname.lastname,
            email: captain.email,
            color: captain.vehicle.color,
            plate: captain.vehicle.plate,
            capacity: captain.vehicle.capacity,
            vehicleType: captain.vehicle.vehicleType
        }
    });
}

const getCaptainProfile = async (req, res) => {
    return res.status(200).json({ captain: req.captain });
}

const logoutCaptain = async (req, res) => {
    res.clearCookie('token');
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
    const blacklistToken = await BlacklistToken.create({ token });

    return res.status(200).json({ message: 'Logged out' });
}


export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };

