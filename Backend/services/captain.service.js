import { Captain } from "../model/captain.model.js";


const createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => { 

    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = Captain.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
}


export { createCaptain }