import { User } from "../model/user.model.js";
import { validationResult } from 'express-validator';
import { createUser } from "../services/user.service.js";


const registerUser = async (req, res) => { 

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }

    const { fullname, email, password } = req.body;

    const hashPassword = await User.hashPassword(password);

    
        const user = await createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password: hashPassword
        });

    const token = user.generateAuthToken();

    return res.status(201).json({ token, user });  
}

const loginUser = async (req, res) => { 
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();

    return res.status(200).json({ token, user: { email: user.email, fullname: user.fullname } });  
}

export { registerUser,loginUser }