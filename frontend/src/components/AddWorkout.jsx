import React, { useState, useEffect } from "react";

const AddWorkout = ({ onAdd, workoutToEdit, onEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  // Populate the form with the workout data if editing
  useEffect(() => {
    if (workoutToEdit) {
      setTitle(workoutToEdit.title);
      setDescription(workoutToEdit.exercises[0]?.description || "");
      setLoad(workoutToEdit.exercises[0]?.load || "");
      setReps(workoutToEdit.exercises[0]?.reps || "");
    }
  }, [workoutToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate form fields
    if (!title || isNaN(load) || isNaN(reps)) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const workoutData = {
      title,
      exercises: [{ description, load: Number(load), reps: Number(reps) }],
    };

    if (workoutToEdit) {
      onEdit(workoutData); // Update the workout if we're editing
    } else {
      onAdd(workoutData); // Add the workout if it's a new one
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
        {workoutToEdit ? "Edit Workout" : "Add New Workout"}
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Workout Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Workout Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Load (kg)"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {workoutToEdit ? "Update Workout" : "Add Workout"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkout;
