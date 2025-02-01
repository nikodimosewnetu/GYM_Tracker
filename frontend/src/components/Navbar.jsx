import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Gym Tracker</Link>
        <div>
          <Link to="/workouts" className="mr-4 hover:text-gray-300">Workouts</Link>
          <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
