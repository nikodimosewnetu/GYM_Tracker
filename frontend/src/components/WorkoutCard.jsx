import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const WorkoutCard = ({ workout, onDelete, onEdit }) => {
  const exercises = workout.exercises || []; // Default to empty array if no exercises

  // Check if the date is valid before formatting it
  const workoutDate = new Date(workout.createdAt);
  const isValidDate = !isNaN(workoutDate);

  const formattedDate = isValidDate
    ? formatDistanceToNow(workoutDate, { addSuffix: true })
    : "Invalid date";

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold text-blue-600">{workout.title}</h3>
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <div key={index} className="text-gray-800">
            <p>
              <strong>Exercise {index + 1}:</strong> {exercise.name}
            </p>
            <p>
              <strong>Load (kg):</strong> {exercise.load}
            </p>
            <p>
              <strong>Reps:</strong> {exercise.reps}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No exercises added yet.</p>
      )}
      <p className="text-gray-500 text-sm">{formattedDate}</p>
      <button onClick={() => onDelete(workout._id)} className="text-red-600">
        🗑️
      </button>
      {/* Edit button */}
      <button
        onClick={() => onEdit(workout)}
        className="ml-2 text-yellow-500 hover:text-yellow-600"
      >
        ✏️ Edit
      </button>
    </div>
  );
};

export default WorkoutCard;
