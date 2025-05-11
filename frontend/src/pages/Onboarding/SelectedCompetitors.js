import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectedCompetitors = () => {
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const [suggestedCompetitors, setSuggestedCompetitors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load selected competitors from localStorage
    const storedCompetitors = localStorage.getItem("selectedCompetitors");
    if (storedCompetitors) {
      setSelectedCompetitors(JSON.parse(storedCompetitors));
    }
    
    // Set additional suggested competitors
    const additionalSuggestions = [
      { id: "brooks", name: "Brooks", selected: false },
      { id: "asics", name: "Asics", selected: false },
      { id: "hoka", name: "Hoka", selected: false },
      { id: "mizuno", name: "Mizuno", selected: false },
      { id: "salomon", name: "Salomon", selected: false },
      { id: "on-running", name: "On Running", selected: false },
      { id: "merrell", name: "Merrell", selected: false },
      { id: "altra", name: "Altra", selected: false }
    ];
    
    setSuggestedCompetitors(additionalSuggestions);
  }, []);
  
  const toggleCompetitorSelection = (competitor, list) => {
    if (list === "selected") {
      // Remove from selected
      setSelectedCompetitors(prev => prev.filter(c => c.id !== competitor.id));
    } else if (list === "suggested") {
      // Check if already in selected
      const isAlreadySelected = selectedCompetitors.some(c => c.id === competitor.id);
      
      if (!isAlreadySelected) {
        // Add to selected
        setSelectedCompetitors(prev => [...prev, { ...competitor, selected: true }]);
      }
      
      // Update suggested list
      setSuggestedCompetitors(prev => 
        prev.map(c => c.id === competitor.id 
          ? { ...c, selected: !c.selected } 
          : c
        )
      );
    }
  };
  
  const handleContinue = () => {
    // Update selected competitors in localStorage
    localStorage.setItem("selectedCompetitors", JSON.stringify(selectedCompetitors));
    navigate("/onboarding/success");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-blue-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-8 bg-white rounded-lg m-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-900">Here are some competitors we've found for you</h2>
            <p className="text-gray-600 mt-2">{selectedCompetitors.length} competitors selected</p>
          </div>
          
          {/* Selected Competitors */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Selected Competitors</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCompetitors.map(competitor => (
                <button
                  key={competitor.id}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-blue-800 text-white"
                  onClick={() => toggleCompetitorSelection(competitor, "selected")}
                >
                  {competitor.name} ✕
                </button>
              ))}
            </div>
          </div>
          
          {/* Suggested Competitors */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Suggested Competitors</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedCompetitors.map(competitor => (
                <button
                  key={competitor.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    competitor.selected 
                      ? "bg-blue-800 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => toggleCompetitorSelection(competitor, "suggested")}
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

export default SelectedCompetitors;
