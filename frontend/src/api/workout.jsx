import axiosInstance from './axiosInstance';  // Axios instance with auth headers
import { jwtDecode } from 'jwt-decode';  // To decode the JWT token

const API_URL = "workouts";

// Helper function to get token and ensure it's available
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found! User must be authenticated.");
  }
  return token;
};

// Get the workouts for the authenticated user
export const getWorkouts = async () => {
  const token = getAuthToken();
  
  try {
    const decoded = jwtDecode(token);  // Decode the token to get user info
    const userId = decoded.id;

    // Fetch workouts only for the logged-in user
    const response = await axiosInstance.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Pass the token in the header
      },
    });

    return response.data;  // Return the workouts fetched for the user
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw new Error("Error fetching workouts. Please try again.");
  }
};

// Create a new workout
export const createWorkout = async (workout) => {
  const token = getAuthToken();

  try {
    const response = await axiosInstance.post(API_URL, workout, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in the header
      },
    });
    return response.data;  // Return the newly created workout data
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Error creating workout. Please try again.");
  }
};

// Delete a workout by id
export const deleteWorkout = async (id) => {
  const token = getAuthToken();

  try {
    await axiosInstance.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw new Error("Error deleting workout. Please try again.");
  }
};

// Update a workout by id
export const updateWorkout = async (id, workoutData) => {
  const token = getAuthToken();

  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, workoutData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in the header
      },
    });
    return response.data;  // Return the updated workout data
  } catch (error) {
    console.error("Error updating workout:", error);
    throw new Error("Error updating workout. Please try again.");
  }
};
