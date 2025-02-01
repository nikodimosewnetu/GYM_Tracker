// src/api/auth.js
import axiosInstance from './axiosInstance';

const API_URL = "auth";

// Register user
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (formData) => {
  const response = await axiosInstance.post(`${API_URL}/login`, formData);
  return response.data;
};
