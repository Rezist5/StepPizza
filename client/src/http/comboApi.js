import { $authHost, $host } from './index';

const API_URL = '/api/combos';

export const fetchCombos = async () => {
    const { data } = await $authHost.get(`${API_URL}`);
    return data;
};

export const getComboById = async (id) => {
    const { data } = await $authHost.get(`${API_URL}/combo/${id}`);
    return data;
};

export const createCombo = async (comboData) => {
    const { data } = await $authHost.post(`${API_URL}/combo`, comboData);
    return data;
};
