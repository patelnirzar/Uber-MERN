import axios from "axios";

const getAddressCoordinates = async (address) => { 
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
            // return `${location.lat},${location.lng}`;
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAddressDistanceTime = async (origin, destination) => { 
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            //raw data
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[0].elements[0];

            //filtering the data
            // const distance = response.data.rows[0].elements[0].distance.text;
            // const duration = response.data.rows[0].elements[0].duration.text;
            // return {
            //     distance,
            //     duration
            // };


        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAddressAutoCompleteSuggestions = async (input) => { 
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            //raw data
            return response.data.predictions;

            //filtering the data
            // return response.data.predictions.map(prediction => prediction.description);
            
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        //throw error;
    }
};

export { getAddressCoordinates, getAddressDistanceTime, getAddressAutoCompleteSuggestions };