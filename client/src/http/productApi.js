import {$authHost, $host} from "./index";

const API_URL = '/api/products';

export const fetchProducts = async () => {
    const {data} = await $host.get(`${API_URL}/`);
    return data;
}

export const getProduct = async (productId) => {
    const {data} = await $host.get(`${API_URL}/${productId}`);
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post(`${API_URL}/`, product);
    return data;
}
