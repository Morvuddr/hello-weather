import axios from 'axios';
const url = 'http://localhost:3001/api/weather';

export default class API {
    static async getWeatherByLocation(location) {
        let destinationURL = `/coordinates?lat=${location.lat}&lon=${location.lon}`;
        return await API.request(destinationURL);
    }

    static request = async (destinationURL) => {
        try {
            return (await axios.get(`${url}${destinationURL}`)).data;
        } catch (e) {
            return ({
                city: {},
                error: {
                    code: 400,
                    status: true
                }
            });
        }
    }
}