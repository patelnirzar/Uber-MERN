import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlenght:[3, 'Firstname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght:[3, 'Email must be at least 3 characters long'],
    },
    password: {
        type: String,
        required: true,
        minlenght: [6, 'Password must be at least 6 characters long'],
        select:false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        else: ['inactive', 'active'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            enum: ['motorcycle', 'car', 'auto'],
            required: true,
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
}, { timestamps: true });

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

export const Captain = mongoose.model('Captain', captainSchema);