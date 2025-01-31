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
        motorcycle: 15
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 5
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1
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
    const distanceTime = await getAddressDistanceTime(pickup, destination);

    const ride = new Ride({
        user: user,
        pickup: pickup,
        destination: destination,
        fare: fare[vehicleType],
        otp: await getOtp(6),
        duration: Math.round(distanceTime.duration.value / 60),
        distance: Math.round(distanceTime.distance.value / 1000)
    });

    await ride.save();
    return ride;
};

const getOtp = async (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
};

const confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain
    })

    const rideData = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!rideData) {
        throw new Error('Ride not found');
    }

    return rideData;

}

const startRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing',
        captain: captain._id
    })

    const ride = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    const rideData = await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    }).populate('user').populate('captain').select('+otp');

    return rideData;
}

export { createRide, getFare, confirmRide, startRide, endRide };