import { formatDistanceToNow } from "date-fns";

const WorkoutCard = ({ workout, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold text-blue-600">{workout.title}</h3>
      <p className="text-gray-800"><strong>Load (kg):</strong> {workout.load}</p>
      <p className="text-gray-800"><strong>Reps:</strong> {workout.reps}</p>
      <p className="text-gray-500 text-sm">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button onClick={() => onDelete(workout._id)} className="text-red-600">
        🗑️
      </button>
    </div>
  );
};

export default WorkoutCard;
