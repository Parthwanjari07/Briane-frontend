import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandProfiling = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    websiteUrl: "",
    targetAudience: "",
    monthlyAdSpend: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to the backend
    // For the MVP, we'll just move to the next step
    localStorage.setItem("brandProfile", JSON.stringify(formData));
    navigate("/onboarding/competitor-selection");
  };

  const industries = [
    "Fashion & Apparel",
    "Health & Wellness",
    "Beauty & Cosmetics",
    "Food & Beverage",
    "Home & Furniture",
    "Tech & Electronics",
    "Sports & Outdoor",
    "Jewelry & Accessories"
  ];

  const audiences = [
    "Gen Z (18-24)",
    "Millennials (25-40)",
    "Gen X (41-56)",
    "Baby Boomers (57-75)",
    "High-Income Professionals",
    "Parents",
    "Fitness Enthusiasts",
    "Tech Enthusiasts"
  ];

  const spendRanges = [
    "$500 - $2,000",
    "$2,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $20,000",
    "$20,000 - $50,000",
    "$50,000+"
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-blue-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-8 bg-white rounded-lg m-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-900">Help us understand your brand better</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="brandName" className="block text-gray-700 text-sm font-medium mb-2">Brand Name</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.brandName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="industry" className="block text-gray-700 text-sm font-medium mb-2">Industry / Category</label>
              <select
                id="industry"
                name="industry"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select an industry</option>
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="websiteUrl" className="block text-gray-700 text-sm font-medium mb-2">Website URL</label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://yourbrand.com"
                value={formData.websiteUrl}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="targetAudience" className="block text-gray-700 text-sm font-medium mb-2">Target Audience</label>
              <select
                id="targetAudience"
                name="targetAudience"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.targetAudience}
                onChange={handleChange}
                required
              >
                <option value="">Select a target audience</option>
                {audiences.map((audience, index) => (
                  <option key={index} value={audience}>{audience}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="monthlyAdSpend" className="block text-gray-700 text-sm font-medium mb-2">Monthly Ad Spend</label>
              <select
                id="monthlyAdSpend"
                name="monthlyAdSpend"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.monthlyAdSpend}
                onChange={handleChange}
                required
              >
                <option value="">Select a range</option>
                {spendRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-800 text-white py-2 px-8 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandProfiling;
