import axios from 'axios';

const API_URL = '/api/users'; 

export const register = async (email, password, fullname) => {
  return await axios.post(`${API_URL}/register`, { email, password, fullname });
};

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const uploadAvatar = async (formData, token) => {
  return await axios.post(`${API_URL}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const logout = async (token) => {
  return await axios.post(`${API_URL}/logout`, null, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
