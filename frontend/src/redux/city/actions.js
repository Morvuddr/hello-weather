import * as types from './actionTypes';
import LocationService from '../../helpers/LocationService';
import API from '../../helpers/API';

export function initWeather() {
    return async (dispatch) => {
        dispatch(loadingStart());
        const { city, error } = await API.getWeatherByLocation(await LocationService.getLocation());
        if (!error.status) {
            dispatch(loadingSuccess(city));
        } else {
            dispatch(loadingError());
        }
    };
}

export function loadingStart() {
    return ({ type: types.CITY_LOADING , payload: { isLoading: true }});
}

export function loadingSuccess(weather) {
    return ({ type: types.CITY_LOADING_SUCCESS, payload: { isLoading: false, error: false, weather: weather}});
}
export function loadingError() {
    return ({ type: types.CITY_LOADING_ERROR, payload: { isLoading: false, error: true }});
}