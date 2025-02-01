import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"; // Import Login Page
import Workouts from "./pages/Workouts";
import { AuthProvider } from "./context/AuthContext"; // Add this import

function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* Add this line */}
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
