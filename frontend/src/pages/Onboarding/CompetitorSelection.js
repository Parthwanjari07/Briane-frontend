import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompetitorSelection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const navigate = useNavigate();
  
  // Mock recommended competitors based on industry
  const [suggestedCompetitors, setSuggestedCompetitors] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API based on the brand profile
    const brandProfile = JSON.parse(localStorage.getItem("brandProfile") || "{}");
    
    // Mock competitors based on the industry
    let mockCompetitors = [];
    
    switch(brandProfile.industry) {
      case "Fashion & Apparel":
        mockCompetitors = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Uniqlo", "Lululemon", "Under Armour", "Gap", "Old Navy"];
        break;
      case "Beauty & Cosmetics":
        mockCompetitors = ["Sephora", "Ulta Beauty", "Fenty Beauty", "Glossier", "Rare Beauty", "MAC", "Kylie Cosmetics", "Maybelline", "L'Oréal", "Estée Lauder"];
        break;
      case "Tech & Electronics":
        mockCompetitors = ["Apple", "Samsung", "Google", "Microsoft", "Sony", "Dell", "HP", "Lenovo", "Bose", "JBL"];
        break;
      default:
        mockCompetitors = ["Nike", "Adidas", "Puma", "New Balance", "Skechers", "Reebok", "Fila", "Converse", "Vans", "Under Armour"];
        break;
    }
    
    setSuggestedCompetitors(mockCompetitors.map(name => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      selected: false
    })));
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleCompetitorSelection = (competitor) => {
    // Check if this competitor is already selected
    const isSelected = selectedCompetitors.some(c => c.id === competitor.id);
    
    if (isSelected) {
      // Remove from selected
      setSelectedCompetitors(prev => prev.filter(c => c.id !== competitor.id));
    } else {
      // Add to selected
      setSelectedCompetitors(prev => [...prev, competitor]);
    }
    
    // Update the suggestedCompetitors state to reflect the selection
    setSuggestedCompetitors(prev => 
      prev.map(c => 
        c.id === competitor.id ? { ...c, selected: !c.selected } : c
      )
    );
  };
  
  const handleContinue = () => {
    // Store selected competitors
    localStorage.setItem("selectedCompetitors", JSON.stringify(selectedCompetitors));
    navigate("/onboarding/selected-competitors");
  };
  
  // Filter competitors based on search term
  const filteredCompetitors = searchTerm
    ? suggestedCompetitors.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suggestedCompetitors;
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-blue-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-8 bg-white rounded-lg m-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-900">Here are some competitors we've found for you</h2>
            <p className="text-gray-600 mt-2">{selectedCompetitors.length} competitors selected</p>
          </div>
          
          {/* Search input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Competitors"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Suggested Competitors */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Suggested Competitors</h3>
            <div className="flex flex-wrap gap-2">
              {filteredCompetitors.map(competitor => (
                <button
                  key={competitor.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    competitor.selected 
                      ? "bg-blue-800 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => toggleCompetitorSelection(competitor)}
                >
                  {competitor.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-blue-800 text-white py-2 px-8 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={selectedCompetitors.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorSelection;
