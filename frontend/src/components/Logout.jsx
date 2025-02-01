import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useState } from 'react';

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Remove token from localStorage to log out
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page after logout (or home page)
  };

  return (
    <nav className="bg-indigo-600 p-4 flex justify-between items-center text-white">
      <div className="text-lg font-semibold">Workout App</div>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Logout;
