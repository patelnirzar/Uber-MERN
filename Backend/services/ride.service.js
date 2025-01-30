import { Ride } from "../model/ride.model.js";
import { getAddressDistanceTime } from "./maps.service.js";
import crypto from 'crypto';

const getFare = async (pickup, destination) => {

    if (!pickup & !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await getAddressDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    //console.log(distanceTime)

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };

    return fare;
};

const createRide = async (user, pickup, destination, vehicleType) => { 
    
    if (!user, !pickup, !destination, !vehicleType) {
        throw new Error('User, pickup, destination and vehicleType are required');
    }

    const fare = await getFare(pickup, destination);
   // console.log(fare);
    const ride = new Ride({
        user: user,
        pickup: pickup,
        destination: destination,
        fare: fare[vehicleType],
        otp: await getOtp(6)
    });

    await ride.save();
    return ride;
};

const getOtp = async (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
};



export { createRide, getFare };