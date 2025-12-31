import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Rocket, FlaskConical, RefreshCw, Loader2, Flag } from "lucide-react";

const API_BASE_URL = "https://cosmic-calendar.onrender.com/api";

export const WowFactsSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState("space");
  const [spaceFact, setSpaceFact] = useState(null);
  const [scientist, setScientist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial content when component mounts or tab changes
  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);
    setIsFlipped(false);

    try {
      if (activeTab === "space") {
        const response = await fetch(`${API_BASE_URL}/space-fact`);
        if (!response.ok) throw new Error("Failed to fetch space fact");
        const data = await response.json();
        setSpaceFact(data);
      } else {
        const response = await fetch(`${API_BASE_URL}/scientist`);
        if (!response.ok) throw new Error("Failed to fetch scientist info");
        const data = await response.json();
        setScientist(data);
      }
    } catch (err) {
      console.error("Error loading content:", err);
      setError("Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextContent = () => {
    loadContent();
  };

  const prevContent = () => {
    loadContent();
  };

  const flipCard = () => {
    if (!loading) {
      setIsFlipped(!isFlipped);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setIsFlipped(false);
  };

  const currentContent = activeTab === "space" ? spaceFact : scientist;

  return (
    <section id="wow-facts" className="py-24 px-4 relative bg-black">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Wow <span className="text-blue-400">Facts</span>
        </h2>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => switchTab("space")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeTab === "space"
                ? "bg-blue-500/30 text-blue-400 border border-blue-400/50"
                : "bg-gray-800/30 text-gray-400 border border-gray-700/50 hover:bg-gray-800/50"
            }`}
          >
            <Rocket size={20} />
            <span>Space Facts</span>
          </button>
          <button
            onClick={() => switchTab("scientists")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeTab === "scientists"
                ? "bg-purple-500/30 text-purple-400 border border-purple-400/50"
                : "bg-gray-800/30 text-gray-400 border border-gray-700/50 hover:bg-gray-800/50"
            }`}
          >
            <FlaskConical size={20} />
            <span>Scientists</span>
          </button>
        </div>
        
        <div className="relative h-96">
          {loading ? (
            <div className={`w-full h-full bg-gradient-to-br backdrop-blur-sm border rounded-xl p-8 flex flex-col items-center justify-center space-y-6 ${
              activeTab === "space"
                ? "from-purple-900/40 via-blue-900/40 to-pink-900/40 border-blue-400/30"
                : "from-indigo-900/40 via-purple-900/40 to-violet-900/40 border-purple-400/30"
            }`}>
              <Loader2 size={48} className="animate-spin text-blue-400" />
              <p className="text-gray-300 text-lg">Loading amazing content...</p>
            </div>
          ) : error ? (
            <div className="w-full h-full bg-gradient-to-br from-red-900/40 via-red-800/40 to-red-900/40 backdrop-blur-sm border border-red-400/30 rounded-xl p-8 flex flex-col items-center justify-center space-y-6">
              <p className="text-red-400 text-lg text-center">{error}</p>
              <button
                onClick={loadContent}
                className="px-6 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-400/50 transition-all duration-300 flex items-center gap-2"
              >
                <RefreshCw size={20} />
                <span>Try Again</span>
              </button>
            </div>
          ) : (
            <div 
              className="relative w-full h-full cursor-pointer"
              onClick={flipCard}
            >
              {!isFlipped ? (
                <div className={`w-full h-full bg-gradient-to-br backdrop-blur-sm border rounded-xl p-8 flex flex-col items-center justify-center space-y-6 transition-colors duration-300 ${
                  activeTab === "space"
                    ? "from-purple-900/40 via-blue-900/40 to-pink-900/40 border-blue-400/30 hover:border-blue-400/50"
                    : scientist?.isIndian
                    ? "from-orange-900/40 via-green-900/40 to-orange-900/40 border-orange-400/30 hover:border-orange-400/50"
                    : "from-indigo-900/40 via-purple-900/40 to-violet-900/40 border-purple-400/30 hover:border-purple-400/50"
                }`}>
                  <div className="text-6xl mb-4">
                    {activeTab === "space" ? "❓" : scientist?.isIndian ? "🇮🇳" : "🌍"}
                  </div>
                  
                  {activeTab === "space" && spaceFact ? (
                    <p className="text-2xl text-gray-200 text-center max-w-2xl font-medium">
                      {spaceFact.question}
                    </p>
                  ) : scientist ? (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-lg text-gray-400">
                          Country: {scientist.country}
                        </p>
                        {scientist.isIndian && (
                          <div className="flex items-center gap-1 bg-orange-500/20 px-2 py-0.5 rounded-full border border-orange-400/30">
                            <Flag size={12} className="text-orange-400" />
                            <span className="text-xs font-semibold text-orange-400">INDIA</span>
                          </div>
                        )}
                      </div>
                      <p className="text-2xl text-gray-200 max-w-2xl font-medium">
                        {scientist.hint}
                      </p>
                    </div>
                  ) : null}
                  
                  <div className="flex items-center gap-2 text-gray-400 animate-pulse mt-4">
                    <RotateCcw size={20} />
                    <span className="text-sm">
                      {activeTab === "space" ? "Click to reveal the answer" : "Click to reveal identity"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br backdrop-blur-sm border rounded-xl p-8 flex flex-col items-center justify-center space-y-6 transition-colors duration-300 ${
                  activeTab === "space"
                    ? "from-pink-900/40 via-purple-900/40 to-blue-900/40 border-purple-400/30 hover:border-purple-400/50"
                    : scientist?.isIndian
                    ? "from-orange-900/40 via-green-900/40 to-orange-900/40 border-orange-400/30 hover:border-orange-400/50"
                    : "from-violet-900/40 via-purple-900/40 to-indigo-900/40 border-indigo-400/30 hover:border-indigo-400/50"
                }`}>
                  <div className="text-6xl mb-4">
                    {activeTab === "space" ? "💡" : "🔬"}
                  </div>
                  
                  {activeTab === "space" && spaceFact ? (
                    <p className="text-lg text-gray-200 text-center max-w-2xl leading-relaxed">
                      {spaceFact.answer}
                    </p>
                  ) : scientist ? (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <h3 className={`text-3xl font-bold ${
                          scientist.isIndian ? "text-orange-400" : "text-indigo-400"
                        }`}>
                          {scientist.name}
                        </h3>
                        {scientist.isIndian && (
                          <Flag size={24} className="text-orange-400" />
                        )}
                      </div>
                      <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                        {scientist.details}
                      </p>
                    </div>
                  ) : null}
                  
                  <div className="flex items-center gap-2 text-gray-400 animate-pulse mt-4">
                    <RotateCcw size={20} />
                    <span className="text-sm">Click to flip back</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between max-w-xs mx-auto pt-8">
          <button 
            onClick={prevContent}
            disabled={loading}
            className={`p-3 rounded-full transition-colors duration-300 border disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === "space"
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-400/30"
                : "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-400/30"
            }`}
            aria-label="Previous fact"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={loadContent}
            disabled={loading}
            className={`p-3 rounded-full transition-colors duration-300 border disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === "space"
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-400/30"
                : "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-400/30"
            }`}
            aria-label="Refresh content"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          
          <button 
            onClick={nextContent}
            disabled={loading}
            className={`p-3 rounded-full transition-colors duration-300 border disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === "space"
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-400/30"
                : "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-400/30"
            }`}
            aria-label="Next fact"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};