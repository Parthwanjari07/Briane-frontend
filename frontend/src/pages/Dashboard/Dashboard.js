import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { darkMode } = useTheme();
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load competitors from localStorage
    const storedCompetitors = localStorage.getItem("selectedCompetitors");
    if (storedCompetitors) {
      const parsedCompetitors = JSON.parse(storedCompetitors);
      
      // Add mock data for each competitor
      const enhancedCompetitors = parsedCompetitors.map(comp => ({
        ...comp,
        daysLive: 29,
        newCampaigns: Math.floor(Math.random() * 5) + 1,
        spendRange: "$25k - $35k",
        adData: {
          format: "Video | CTA",
          cta: "Shop Now",
          estimatedCTR: (Math.random() * 4 + 1).toFixed(1) + "%",
          engagementScore: Math.random() > 0.5 ? "High" : "Medium"
        }
      }));
      
      setCompetitors(enhancedCompetitors);
    }
    setLoading(false);
  }, []);
  
  // Mock top competitor ads
  const topAds = competitors.slice(0, 3).map(comp => ({
    brand: comp.name,
    format: "Format: Video | CTA",
    cta: "Shop Now",
    estimatedCTR: (Math.random() * 4 + 1).toFixed(1) + "%",
    engagementScore: Math.random() > 0.5 ? "High" : "Medium" 
  }));
  
  // Mock benchmark data
  const benchmarkData = {
    ctr: "1.4%",
    engagementRate: "1.2%",
    avgWeeklySpend: "3.5k"
  };
  
  // Mock AI alerts
  const aiAlerts = [
    {
      type: "New Campaign Detected",
      content: "Adidas launched 2 new campaigns. Spend: 10K - 30K"
    },
    {
      type: "Creative Shift",
      content: "Nike switched to a testimonial-based meme format"
    },
    {
      type: "Engagement Spike",
      content: "Campus saw an 8% engagement boost in 24h."
    }
  ];
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome Back, {currentUser?.name || "User"}</h1>
            <p className="text-gray-600">Here's your brand's current ad performance & competitor activity</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              <div className="w-full h-full bg-blue-800 flex items-center justify-center text-white font-medium">
                {currentUser?.name?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </header>
        
        {/* Competitor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {competitors.slice(0, 5).map((competitor, index) => (
            <div 
              key={competitor.id} 
              className={`bg-white p-4 rounded-lg shadow-sm border-t-4 ${index === 0 ? "border-blue-500" : "border-gray-200"}`}
            >
              <h3 className="font-medium text-lg mb-2">{competitor.name}</h3>
              <div className="text-gray-700 mb-1">{competitor.daysLive} days live</div>
              <div className="text-gray-700 mb-1">{competitor.newCampaigns} new campaigns this week</div>
              <div className="text-gray-700">Spend: {competitor.spendRange}</div>
            </div>
          ))}
        </div>
        
        {/* Top Competitor Ads */}
        <h2 className="text-xl font-bold mb-4">Top Competitor Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topAds.map((ad, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="h-32 bg-gray-200 rounded-md mb-4 overflow-hidden">
                <img 
                  src={
                    index === 0 
                      ? "https://images.unsplash.com/photo-1597075095308-0b47fc649175" 
                      : index === 1
                        ? "https://images.unsplash.com/photo-1612810806563-4cb8265db55f"
                        : "https://images.unsplash.com/photo-1636247497842-81ee9c80f9df"
                  } 
                  alt={`${ad.brand} Ad`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-1">{ad.brand}</h3>
              <div className="text-gray-600 text-sm mb-1">{ad.format} - {ad.cta}</div>
              <div className="flex justify-between mt-2">
                <div className="text-sm">
                  <span className="text-gray-600">Estimated CTR: </span>
                  <span className="font-medium">{ad.estimatedCTR}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Engagement Score: </span>
                  <span className="font-medium">{ad.engagementScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Benchmarks */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Brand vs Industry Benchmarks</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <div className="font-medium">CTR</div>
                  <div className="font-medium">{benchmarkData.ctr}</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: "40%" }}></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <div className="font-medium">Engagement Rate</div>
                  <div className="font-medium">{benchmarkData.engagementRate}</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="font-medium">Avg Weekly Spend</div>
                  <div className="font-medium">${benchmarkData.avgWeeklySpend}</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Alerts */}
          <div>
            <h2 className="text-xl font-bold mb-4">AI Alerts</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              {aiAlerts.map((alert, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-medium">{alert.type}</h3>
                  <p className={`text-sm ${index === 1 ? "text-red-600" : "text-gray-600"}`}>{alert.content}</p>
                  {index < aiAlerts.length - 1 && <hr className="my-3" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
