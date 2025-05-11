import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-blue-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-8 bg-white rounded-lg m-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-center text-blue-900 mb-2">
            Your Account has been Successfully Created
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            Redirecting you to your dashboard...
          </p>
          
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-800 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
