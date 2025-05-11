import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Login = () => {
  const { login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setIsLoading(true);
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in: " + (err.message || "Please check your credentials"));
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
            Sign in to BRAINE
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Or{" "}
            <Link
              to="/signup"
              className={`font-medium ${
                darkMode 
                  ? 'text-purple-primary hover:text-purple-light' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
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
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 focus:ring-0 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-100 text-purple-primary'
                    : 'border-gray-300 text-blue-600'
                }`}
              />
              <label 
                htmlFor="remember-me" 
                className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className={`font-medium ${
                  darkMode 
                    ? 'text-purple-primary hover:text-purple-light'
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Forgot your password?
              </button>
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
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          
          <div className={`mt-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>
              For demo purposes, you can use:
              <br />
              email: demo@example.com | password: password123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
