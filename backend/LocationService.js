const axios = require('axios');
const url = 'https://api.openweathermap.org/data/2.5/weather';
const APIkey = 'b50d06cf0be2ceacf57cf97451e6a7af';

    async function getWeatherByLocation(location) {
        let destinationURL = `?lat=${location.lat}&lon=${location.lon}&APPID=${APIkey}`;
        return parseWeatherData(await requestWeather(destinationURL));
    }
    async function  getWeatherByCityName(name) {
        let destinationURL = `?q=${name}&APPID=${APIkey}`;
        return parseWeatherData(await requestWeather(destinationURL));
    }

    const requestWeather = async (destinationURL) => {
        let result = {};
        try {
            result = await axios.get(`${url}${destinationURL}`);
            return ({
                data: result.data,
                error: { code: 200, status: false }
            });
        } catch (e) {
            return ({
                data: '',
                error: { code: 404, status: true }
            });
        }
    };

    const parseWeatherData = ({data, error}) => {
        if (error.status) {
            return ({
                city: {},
                error: error,
            });
        }
        return ({
            city : {
                name: data.name,
                img: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                temperature: (data.main.temp - 273.15).toFixed(0) + '°C',
                wind: data.wind.speed + ' m/s',
                cloudiness: data.weather[0].description,
                pressure: data.main.pressure + ' hpa',
                humidity: data.main.humidity + ' %',
                location: '[' + data.coord.lat + ',' + data.coord.lon + ']',
            },
            error: error,
        });
    };

    exports.getWeatherByLocation = getWeatherByLocation;
    exports.getWeatherByCityName = getWeatherByCityName;