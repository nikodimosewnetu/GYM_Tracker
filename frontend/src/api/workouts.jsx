import axiosInstance from './axiosInstance';  // Axios instance with auth headers
import { jwtDecode } from 'jwt-decode';  // To decode the JWT token

const API_URL = "workouts";
// Get the workouts for the authenticated user
export const getWorkouts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found! User must be authenticated.");
  }

  try {
    // Decode the token to get user info
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    // Fetch workouts only for the logged-in user
    const response = await axiosInstance.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the header
      },
    });

    console.log('Fetched Workouts:', response.data);  // Log to see the structure
    return response.data;  // Return the workouts fetched for the user
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw new Error("Error fetching workouts. Please try again.");
  }
};


// Create a new workout
export const createWorkout = async (workout) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found! User must be authenticated.");
  }

  try {
    return await axiosInstance.post(API_URL, workout, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in the header
      },
    });
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Error creating workout. Please try again.");
  }
};

// Delete a workout by id
// Delete a workout by id
export const deleteWorkout = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found! User must be authenticated.");
  }

  try {
    await axiosInstance.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Optionally, update local state if onDelete function is passed
    // onDelete(id); <-- Call onDelete here if it's passed in as a prop in Workouts.jsx
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw new Error("Error deleting workout. Please try again.");
  }
};


// Update a workout by id
export const updateWorkout = async (id, workoutData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found! User must be authenticated.");
  }

  try {
    return await axiosInstance.put(`${API_URL}/${id}`, workoutData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in the header
      },
    });
  } catch (error) {
    console.error("Error updating workout:", error);
    throw new Error("Error updating workout. Please try again.");
  }
};
