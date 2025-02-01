import React, { useState } from 'react';
import { createWorkout } from '../api/workouts'; // Import the createWorkout function
import { jwtDecode } from "jwt-decode"; // Correct default import for jwt-decode

const token = localStorage.getItem("token");
let userId = null;

if (token) {
  try {
    const decoded = jwtDecode(token);  // Decode the token to get user data
    userId = decoded.id; // Change userId to id as per your token structure
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

const AddWorkout = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || isNaN(load) || isNaN(reps)) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const newWorkout = { 
      title, 
      user: userId,  // Include user ID in the payload
      exercises: [{ description, load: Number(load), reps: Number(reps) }]
    };

    try {
      if (token && userId) {
        const { data } = await createWorkout(newWorkout, token);
        onAdd(data);  // Update parent component with the new workout
      } else {
        setError("No token or user ID found!");
      }
    } catch (error) {
      setError("Error adding workout: " + (error.response ? error.response.data : error.message));
    }
  };

  if (!token || !userId) {
    return <div className="text-red-500 text-center font-semibold">No token or user ID found!</div>;  // Display this message if there's no token or user ID
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">Add New Workout</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Workout Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Workout Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Load (kg)"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
          >
            Add Workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkout;
