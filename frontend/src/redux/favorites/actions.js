import * as types from './actionTypes';
import API from '../../helpers/API';

export function initCities() {
    return async (dispatch) => {
        const cities = await API.getCities();
        cities.map(async localCity => {
            dispatch(addNewCityLoading(localCity.name, true));
            dispatch(addNewCity(localCity));
            const { city, error } = await API.getWeatherByCityName(localCity.name);

            if (error.status) {
                dispatch(loadingError(localCity.name));
            } else {
                dispatch(updateCity(city));
            }

            dispatch(addNewCityLoading(localCity.name, false));
        });
    };
}

export function addNewCityAsync(newCity, cities) {
    return async (dispatch) => {
        if (!isNaN(newCity.name)) {
            alert("Некорректные данные");
            return;
        }
        if (cities.findIndex(city => city.name === newCity.name) === -1) {
            dispatch(addNewCityLoading(newCity.name, true));
            dispatch(addNewCity(newCity));
            const { city, error } = await API.addNewCity(newCity.name);

            if (error.status) {
                if (error.code === 404) {
                    alert('Невозможно найти погоду для города: ' + newCity.name);
                    dispatch(removeCity(newCity.name));

                } else {
                        alert('Не удалось добавить город ' + newCity.name);
                        dispatch(removeCity(newCity.name));
                }
            } else {
                dispatch(updateCity(city));
                dispatch(addNewCityLoading(newCity.name, false));
            }
        } else {
            alert("Город уже добавлен в избранное")
        }
    };
}

export function removeCityAsync(name) {
    return async (dispatch) => {
        const { error } = await API.deleteCity(name);
        if (!error.status) {
            dispatch(removeCity(name));
        } else {
            alert("Не удалось удалить город " + name);
        }
    }
}


export function addNewCity(city) {
    return ({ type: types.ADD_NEW_CITY, payload: { city } });
}

export function updateCity(city) {
    return ({ type: types.UPDATE_CITY, payload: { city } });
}

export function removeCity(name) {
    return ({ type: types.REMOVE_CITY, payload: { name } });
}

export function addNewCityLoading(name, isLoading) {
    return {
        type: types.ADD_NEW_CITY_LOADING,
        payload: {
            name,
            isLoading
        }
    };
}

export function loadingError(name) {
    return {
        type: types.LOADING_ERROR,
        payload: { name }
    }
}