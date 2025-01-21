import { User } from "../model/user.model.js";

const createUser = async ({ firstname, lastname, email, password }) => { 

    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = User.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}


export { createUser }