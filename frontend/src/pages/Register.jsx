import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white">
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
          Create an Account
        </h2>
        
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-700">Register</h3>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <AuthForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Register"
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
