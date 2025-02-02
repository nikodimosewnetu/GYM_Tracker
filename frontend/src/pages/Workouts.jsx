import { useState, useEffect } from "react";
import { getWorkouts, deleteWorkout, createWorkout, updateWorkout } from "../api/workouts";
import WorkoutCard from "../components/WorkoutCard";
import AddWorkout from "../components/AddWorkout";
import Logout from "../components/Logout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [error, setError] = useState(null);
  const [workoutToEdit, setWorkoutToEdit] = useState(null); // To store workout data for editing
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.id) {
        return decodedToken.id;
      } else {
        throw new Error("User ID not found in token");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchWorkouts();
    }
  }, [token, navigate]);

  const fetchWorkouts = async () => {
    try {
      const userId = getUserIdFromToken();
      if (userId) {
        const workoutsData = await getWorkouts(userId);
        setWorkouts(workoutsData);
      } else {
        setError("Invalid token. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      setError("Failed to load workouts. Please check your connection or try again later.");
      console.error("Error fetching workouts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== id)
      );
    } catch (error) {
      setError("Failed to delete workout.");
    }
  };

  const handleAddWorkout = async (newWorkout) => {
    try {
      const addedWorkout = await createWorkout(newWorkout);
      setWorkouts((prevWorkouts) => [...prevWorkouts, addedWorkout]);
      setShowAddWorkout(false);
    } catch (error) {
      setError("Failed to add workout. Please try again.");
    }
  };

  const handleEditWorkout = async (updatedWorkout) => {
    try {
      const workoutId = workoutToEdit._id; // Get the ID of the workout being edited
      const response = await updateWorkout(workoutId, updatedWorkout);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === workoutId ? response.data : workout
        )
      );
      setShowAddWorkout(false);
      setWorkoutToEdit(null); // Reset the workout being edited
    } catch (error) {
      setError("Failed to update workout. Please try again.");
    }
  };

  const handleEditClick = (workout) => {
    setWorkoutToEdit(workout); // Set workout data for editing
    setShowAddWorkout(true); // Show the form for editing
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-700 p-8 text-white">
      <Logout />
      <h2 className="text-3xl font-extrabold text-center mb-6">My Workouts</h2>

      <div className="text-center mb-6">
        <button
          onClick={() => setShowAddWorkout(true)}
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-200"
        >
          Add Workout
        </button>
      </div>

      {showAddWorkout && (
        <div className="mb-6">
          <AddWorkout
            onAdd={handleAddWorkout}
            workoutToEdit={workoutToEdit}
            onEdit={handleEditWorkout}
          />
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.length > 0 ? (
  workouts.map((workout) => (
    <WorkoutCard
      key={workout._id}  // Ensure a unique key based on workout._id
      workout={workout}
      onDelete={handleDelete}
      onEdit={handleEditClick}  // Pass handleEditClick to WorkoutCard
    />
  ))
) : (
  <div className="col-span-full text-center text-lg text-gray-300">
    No workouts found. Please add one!
  </div>
)}

      </div>
    </div>
  );
};

export default Workouts;
