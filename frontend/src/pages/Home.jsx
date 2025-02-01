import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (<>
     <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-center p-4">
      
      <h1 className="text-5xl font-extrabold text-white mb-4 tracking-wide shadow-md">
        Welcome to Gym Workout Tracker
      </h1>
      <p className="text-lg text-gray-200 mb-6 max-w-xl mx-auto">
        Track your workouts and achieve your fitness goals! Whether you're lifting
        weights, running, or doing bodyweight exercises, we help you stay on track.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-yellow-600"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-300"
        >
          Login
        </Link>
      </div>
    </div>
    </>
  );
};

export default Home;
