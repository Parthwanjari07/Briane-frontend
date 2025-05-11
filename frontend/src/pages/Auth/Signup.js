import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Signup = () => {
  const { signup } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      await signup(formData.name, formData.email, formData.password);
      navigate("/onboarding/brand-profiling");
    } catch (err) {
      setError("Failed to create an account: " + (err.message || "Please try again"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-dark-200' : 'bg-gray-50'}`}>
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-dark-100 text-purple-primary' : 'bg-gray-100 text-gray-600'}`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg ${darkMode ? 'bg-dark-100 shadow-dark-lg' : 'bg-white shadow-md'}`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Or{" "}
            <Link
              to="/login"
              className={`font-medium ${
                darkMode 
                  ? 'text-purple-primary hover:text-purple-light' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="Password (min. 6 characters)"
              />
            </div>
            
            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? (darkMode ? 'bg-purple-800' : 'bg-blue-400')
                  : (darkMode 
                      ? 'bg-purple-primary hover:bg-purple-hover'
                      : 'bg-blue-600 hover:bg-blue-700')
              } focus:outline-none focus:ring-2 ${
                darkMode ? 'focus:ring-purple-400' : 'focus:ring-blue-500'
              } focus:ring-offset-2 disabled:opacity-50 transition-colors`}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
          
          <div className={`text-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            By signing up, you agree to our{" "}
            <button type="button" className={`font-medium ${darkMode ? 'text-purple-primary' : 'text-blue-600'}`}>
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className={`font-medium ${darkMode ? 'text-purple-primary' : 'text-blue-600'}`}>
              Privacy Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
