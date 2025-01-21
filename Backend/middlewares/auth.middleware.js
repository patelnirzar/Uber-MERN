import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BlacklistToken from "../model/blacklistToken.model.js";
import { Captain } from "../model/captain.model.js";


const authUser = async (req, res, next) => { 
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded._id)

        req.user = user;

        return next();   
    }
    catch(error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const captain = await Captain.findById(decoded._id)

        req.captain = captain;

        return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export { authUser, authCaptain }