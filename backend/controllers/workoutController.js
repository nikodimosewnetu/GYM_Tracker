const Workout = require("../models/Workout");

// ✅ Get All Workouts (for a User)
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ✅ Add a Workout
exports.addWorkout = async (req, res) => {
  try {
    const { title, exercises } = req.body;
    const newWorkout = new Workout({ user: req._id, title, exercises });
    await newWorkout.save();
    res.json(newWorkout);
  } catch (error) {
    res.status(500).json({ msg: "Error adding workout", error: error.message });
  }
};

// ✅ Update a Workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ msg: "Workout not found" });

    if (workout.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ msg: "Error updating workout", error: error.message });
  }
};

// ✅ Delete a Workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ msg: "Workout not found" });

    if (workout.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    await Workout.findByIdAndDelete(req.params.id);
    res.json({ msg: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting workout", error: error.message });
  }
};
