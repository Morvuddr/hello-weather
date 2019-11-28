const express = require('express');
const { readCities, createNewCity, deleteCity } = require('./helpers/DatabaseService');
const { getWeatherByCityName } = require('./helpers/LocationService');

const favoritesRouter = express.Router();

favoritesRouter.route('/').get((req, res) => {
    readCities((err, cities) => {
        if(err) {
            return res.status(500).send('Server error');
        } else {
            return res.json(cities);
        }
    });
});

favoritesRouter.route('/:name').post(async (req, res) => {
    let name = req.params.name.trim();
    const result = await getWeatherByCityName(name);
    if (!result.error.status) {
        createNewCity(name, async (err) => {
            if(err) {
                return res.status(409).send('Duplicate');
            } else {
                return res.json(result);
            }
        })
    } else {
        return res.status(404).json(result);
    }

});

favoritesRouter.route('/:name').delete((req, res) => {
    let name = req.params.name.trim();
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    deleteCity(name, (err, result) => {
        if (err) {
            return res.status(500).send("Server Error");
        } else {
            if (result.affectedRows === 1) {
                return res.status(204).end();
            } else {
                return res.status(409).send("City not found");
            }
        }
    })
});


exports.favoritesRouter = favoritesRouter;