import { getAddressCoordinates, getAddressDistanceTime, getAddressAutoCompleteSuggestions } from "../services/maps.service.js";
import { validationResult } from 'express-validator';

const getCoordinates = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getDistanceTime = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    try {
        const distanceTime = await getAddressDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    
}

const getAutoCompleteSuggestions = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    try {
        const suggestions = await getAddressAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export { getCoordinates, getDistanceTime, getAutoCompleteSuggestions };