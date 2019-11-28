import { ADD_NEW_CITY, ADD_NEW_CITY_LOADING, REMOVE_CITY, UPDATE_CITY, LOADING_ERROR } from './actionTypes';

const initialState = {
    cities: [],
    isLoading: [],
    errors: [],
};

export function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_CITY: {
            const cities = [...state.cities, action.payload.city];
            cities.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            return {
                ...state,
                cities,
            };
        }

        case UPDATE_CITY: {
            const { city } = action.payload;
            const cities = [...state.cities];
            cities[cities.findIndex(c => c.name === city.name)] = city;
            return {
                ...state,
                cities,
            };
        }

        case ADD_NEW_CITY_LOADING: {
            const { name, isLoading } = action.payload;
            const newIsLoading = [...state.isLoading];
            const isCityLoadingNow = newIsLoading.includes(name);

            if (isCityLoadingNow && !isLoading) {
                newIsLoading.splice(newIsLoading.indexOf(name), 1);
            } else if (isLoading && !isCityLoadingNow) {
                newIsLoading.push(name);
            }
            return {
                ...state,
                isLoading: newIsLoading,
            };
        }

        case REMOVE_CITY: {
            const cities = [...state.cities];
            cities.splice(cities.findIndex(c => c.name === action.payload.name), 1);
            return {
                ...state,
                cities,
            };
        }

        case LOADING_ERROR: {
            const name = action.payload.name;
            const errors = [...state.errors];
            if (!errors.includes(name)) {
                errors.push(name);
            }
            return {
                ...state,
                errors,
            };
        }

        default: {
            return state;
        }
    }
}