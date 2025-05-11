import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const BrandProfiling = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    websiteUrl: "",
    targetAudience: "",
    monthlyAdSpend: "$1,000 - $5,000",
  });

  const [formStep, setFormStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (formStep === 1) {
      if (!formData.brandName.trim()) {
        newErrors.brandName = "Brand name is required";
      }
      if (!formData.industry.trim()) {
        newErrors.industry = "Industry is required";
      }
    } else if (formStep === 2) {
      if (!formData.websiteUrl.trim()) {
        newErrors.websiteUrl = "Website URL is required";
      } else if (
        !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i.test(
          formData.websiteUrl
        )
      ) {
        newErrors.websiteUrl = "Please enter a valid URL";
      }
      
      if (!formData.targetAudience.trim()) {
        newErrors.targetAudience = "Target audience is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setFormStep(formStep + 1);
    }
  };

  const handlePrevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      // Save brand profile to localStorage
      localStorage.setItem("brandProfile", JSON.stringify(formData));
      
      // Navigate to competitor selection
      navigate("/onboarding/competitor-selection");
    }
  };

  const industryOptions = [
    "Fashion & Apparel",
    "Beauty & Cosmetics",
    "Health & Wellness",
    "Food & Beverage",
    "Home & Garden",
    "Electronics & Gadgets",
    "Fitness & Sports",
    "Jewelry & Accessories",
    "Pet Products",
    "Baby & Children",
    "Sustainable Products",
    "Other"
  ];

  const spendOptions = [
    "$500 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+"
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-dark-200' : 'bg-gray-50'}`}>
      <div className={`max-w-lg w-full p-8 rounded-lg ${darkMode ? 'bg-dark-100 shadow-dark-lg' : 'bg-white shadow-md'}`}>
        <div className="mb-8 text-center">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Tell us about your brand
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Step {formStep} of 3: {formStep === 1 ? "Brand Details" : formStep === 2 ? "Website & Audience" : "Ad Spend"}
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className={`${darkMode ? 'bg-purple-primary' : 'bg-blue-600'} h-2 rounded-full`} 
              style={{ width: `${(formStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {formStep === 1 && (
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="brandName" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${
                    darkMode ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent`}
                  placeholder="Your brand name"
                />
                {errors.brandName && (
                  <p className="mt-1 text-sm text-red-500">{errors.brandName}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="industry" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Industry / Category
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${
                    darkMode ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent`}
                >
                  <option value="">Select your industry</option>
                  {industryOptions.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
                )}
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="websiteUrl" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Website URL
                </label>
                <input
                  type="text"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${
                    darkMode ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent`}
                  placeholder="https://yourbrand.com"
                />
                {errors.websiteUrl && (
                  <p className="mt-1 text-sm text-red-500">{errors.websiteUrl}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="targetAudience" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Target Audience
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${
                    darkMode ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent`}
                  placeholder="e.g., Women 18-35, Fitness Enthusiasts"
                />
                {errors.targetAudience && (
                  <p className="mt-1 text-sm text-red-500">{errors.targetAudience}</p>
                )}
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="monthlyAdSpend" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Monthly Ad Spend
                </label>
                <select
                  id="monthlyAdSpend"
                  name="monthlyAdSpend"
                  value={formData.monthlyAdSpend}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${
                    darkMode ? 'bg-dark-300 border-dark-100 text-white focus:ring-purple-primary' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent`}
                >
                  {spendOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-blue-50'} mt-4`}>
                <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-purple-primary' : 'text-blue-800'}`}>
                  Why we ask for this information:
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your ad spend range helps us better recommend competitors and analyze their spending patterns relative to your budget. This information is kept confidential.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {formStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-dark-300 text-gray-300 hover:bg-dark-400' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {formStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-purple-primary text-white hover:bg-purple-hover' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-purple-primary text-white hover:bg-purple-hover' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Submit & Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandProfiling;
