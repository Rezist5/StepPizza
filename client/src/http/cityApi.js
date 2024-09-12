import { $host } from './index';

const API_URL = '/api/cities';

export const fetchCities = async () => {
    try {
        const { data } = await $host.get(API_URL);
        return data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;  
    }
};

export const createCity = async (name, countryId) => {
    try {
        const { data } = await $host.post(API_URL, { name, countryId });
        return data;
    } catch (error) {
        console.error('Error creating city:', error);
        throw error;  
    }
};
