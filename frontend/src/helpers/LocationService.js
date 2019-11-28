export default class LocationService {

    static getLocation = async () => {
        let position = null;
        try {
            position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                { enableHighAccuracy: true }
            ));
        } catch (e) {
            console.error(`Get location error ${e}`);
        }
        return {
            lat: position ? position.coords.latitude.toFixed(2) : '59.91',
            lon: position ? position.coords.longitude.toFixed(2) : '30.32',
        };
    };

}