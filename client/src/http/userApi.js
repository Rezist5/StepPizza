import {$authHost, $host} from './index';

const API_URL = '/api/users'; 

export const registration = async (email, password, fullname) => {
    const {data} = await $host.post(`${API_URL}/registration`, { email, password, fullname });
    localStorage.setItem('token', data.token);
    return data;
};

export const login = async (email, password) => {
    const {data} = await $host.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', data.token);
    return data;
};

export const logout = async () => {
    const {data} = await $authHost.post(`${API_URL}/logout`);
    localStorage.removeItem('token');
    return data;
};

export const checkAuth = async () => {
    const {data} = await $authHost.get(`${API_URL}/check`);
    localStorage.setItem('token', data.token);
    return data;
};

export const createAdmin = async (email, password, fullname) => {
    const {data} = await $authHost.post(`${API_URL}/admin`, { email, password, fullname });
    return data;
};

export const getNameById = async (id) => {
    const {data} = await $authHost.get(`${API_URL}/name/${id}`);
    return data;
};

export const uploadAvatar = async (formData) => {
    const {data} = await $authHost.post(`${API_URL}/avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
};
