const express = require('express');

const { getWeatherByCityName, getWeatherByLocation } = require('./helpers/LocationService');

const weatherRouter = express.Router();

weatherRouter.route('/').get(async (req, res) => {
    let name = req.query.city.trim();
    const result = await getWeatherByCityName(name);
    if (!result.error.status) {
        res.json(result);
    } else {
        res.status(404).json(result);
    }
});

weatherRouter.route('/coordinates').get(async (req, res) => {
    const result = await getWeatherByLocation({
        lat: req.query.lat,
        lon: req.query.lon
    });
    if (!result.error.status) {
        return res.json(result);
    } else {
        return res.status(404).send(result);
    }
});

exports.weatherRouter = weatherRouter;