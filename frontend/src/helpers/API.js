import axios from 'axios';
const url = 'http://localhost:3001/api/weather';
const favorites_url = 'http://localhost:3001/api/favorites';

export default class API {
    static async getWeatherByLocation(location) {
        let destinationURL = `/coordinates?lat=${location.lat}&lon=${location.lon}`;
        return await API.requestWeather(destinationURL);
    }

    static async getWeatherByCityName(name) {
        let destinationURL = `?city=${name}`;
        return await API.requestWeather(destinationURL);
    }

    static requestWeather = async (destinationURL) => {
        try {
            return (await axios.get(`${url}${destinationURL}`)).data;
        } catch (_) {
            return ({
                city: null,
                error: {
                    status: true,
                    code: null
                }
            });
        }
    };

    static getCities = async () => {
        try {
            return (await axios.get(`${favorites_url}`)).data;
        } catch (e) {
            return [];
        }

    };

    static addNewCity = async (name) => {
        try {
            const { city } = (await axios.post(`${favorites_url}/${name}`)).data;
            return({
                city,
                error: {
                    status: false
                }
            });
        } catch (e) {
            return({
                city: null,
                error: {
                    status: true,
                    code: null
                }
            })
        }
    };

    static deleteCity = async (name) => {
        try {
            await axios.delete(`${favorites_url}/${name}`);
            return ({
                error: {
                    status: false
                }
            })
        } catch (_) {
            return ({
                error: {
                    status: true
                }
            });
        }
    }

}