import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    
    setError("");
    setLoading(true);

    try {
      await signup(formData);
      navigate("/onboarding/brand-profiling");
    } catch (error) {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Blue background with AD Tech */}
      <div className="hidden md:flex md:w-1/2 bg-blue-800 text-white flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">AD Tech</h1>
        <p className="text-lg text-center">
          Next-gen AI to analyze your brand, track competitors, and generate ads that convert.
        </p>
      </div>
      
      {/* Right side - Signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Sign Up</h2>
            <p className="text-gray-600">You will be redirected to your brand profile now</p>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Continue"}
            </button>
          </form>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
