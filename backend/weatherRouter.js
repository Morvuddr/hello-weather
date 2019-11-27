const express = require('express');

const { getWeatherByCityName, getWeatherByLocation } = require('./LocationService');

const weatherRouter = express.Router();

weatherRouter.route('/').get(async (req, res) => {
    let name = req.query.city.trim();
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const result = await getWeatherByCityName(name);

    if (result.error) {
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

    if (result.error) {
        res.json({
            city: result.city,
            error: result.error
        });
    } else {
        res.status(404).send({ city: '', error: result.error});
    }
});

exports.weatherRouter = weatherRouter;