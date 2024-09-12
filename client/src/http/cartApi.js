import {$authHost, $host} from "./index";

const API_URL = '/api/cart';

export const createCart = async (userId) => {
    const {data} = await $authHost.post(`${API_URL}/`, {userId});
    return data;
}

export const getActiveCart = async (userId) => {
    const { data } = await $authHost.get(`/api/cart/active/${userId}`);
    return data;
};

export const addToCart = async (cartId, productId, sizeId, quantity) => {
    const {data} = await $authHost.post(`${API_URL}/add`, {cartId, productId, sizeId, quantity});
    return data;
}

export const getCartItems = async (cartId) => {
    const {data} = await $authHost.get(`${API_URL}/${cartId}`);
    return data;
}

export const updateCartItem = async (cartItemId, quantity) => {
    const {data} = await $authHost.put(`${API_URL}/update`, {cartItemId, quantity});
    return data;
}

export const removeCartItem = async (cartItemId) => {
    const {data} = await $authHost.delete(`${API_URL}/remove/${cartItemId}`);
    return data;
}

export const clearCart = async (cartId) => {
    const {data} = await $authHost.delete(`${API_URL}/clear/${cartId}`);
    return data;
}
