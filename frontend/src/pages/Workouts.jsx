import { useState, useEffect } from "react";
import { getWorkouts, deleteWorkout } from "../api/workouts"; 
import WorkoutCard from "../components/WorkoutCard";
import AddWorkout from "../components/AddWorkout";
import Logout from "../components/Logout";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);  
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      // Check if workouts are in localStorage
      const storedWorkouts = localStorage.getItem("workouts");
      if (storedWorkouts) {
        setWorkouts(JSON.parse(storedWorkouts));
      } else {
        try {
          const { data } = await getWorkouts(token); // Fetch all workouts
          const filteredWorkouts = data.filter(workout => workout.user === userId); // Filter workouts by userId
          setWorkouts(filteredWorkouts);  // Set the workouts for the logged-in user

          // Persist the workouts in localStorage
          localStorage.setItem("workouts", JSON.stringify(filteredWorkouts));
        } catch (error) {
          setError("Failed to load workouts. Please try again.");
          console.error("Error fetching workouts", error);
        }
      }
    };
    if (token && userId) fetchWorkouts(); // Fetch only if token and userId exist
  }, [token, userId]);

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id, token);
      const updatedWorkouts = workouts.filter(workout => workout._id !== id);
      setWorkouts(updatedWorkouts);
      // Update localStorage after deletion
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
    } catch (error) {
      setError("Failed to delete workout. Please try again.");
      console.error("Error deleting workout", error);
    }
  };

  const handleAddWorkout = (newWorkout) => {
    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    setShowAddWorkout(false);
    // Save updated workouts to localStorage
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };

  return (
    <>
      <Logout />
      <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-700 p-8 text-white">
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
            <AddWorkout onAdd={handleAddWorkout} />
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <WorkoutCard 
                key={workout._id} 
                workout={workout} 
                onDelete={handleDelete} 
              />
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-300">
              No workouts found. Please add one!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Workouts;
