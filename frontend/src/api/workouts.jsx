// src/api/workouts.js
import axiosInstance from './axiosInstance';

const API_URL = "workouts";

// Fetch all workouts
export const getWorkouts = async () => {
  return axiosInstance.get(API_URL);
};

// Create a new workout
export const createWorkout = async (workout) => {
  return axiosInstance.post(API_URL, workout);
};

// Delete a workout by id
export const deleteWorkout = async (id) => {
  return axiosInstance.delete(`${API_URL}/${id}`);
};

// Update a workout by id
export const updateWorkout = async (id, workoutData) => {
  return axiosInstance.put(`${API_URL}/${id}`, workoutData);
};
