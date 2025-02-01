import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Correctly import BrowserRouter
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>  {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
