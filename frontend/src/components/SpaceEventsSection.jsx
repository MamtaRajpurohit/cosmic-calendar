import React from "react";
import { useState } from "react";
import { Calendar, Sparkles, Search, Loader2, Flag } from "lucide-react";

const API_BASE_URL = "http://localhost:3001/api";

export const SpaceEventsSection = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [event, setEvent] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setShowResult(false);
    setEvent(null);
    setError(null);
  };

  // const searchEvent = async () => {
  //   if (!selectedDate) return;

  //   setLoading(true);
  //   setError(null);
  //   setShowResult(false);

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/space-event`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ date: selectedDate }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch space event");
  //     }

  //     const data = await response.json();
      
  //     // Check if event was found
  //     if (data.found === false || !data.year) {
  //       setEvent(null);
  //     } else {
  //       setEvent(data);
  //     }
  //     setShowResult(true);
  //   } catch (err) {
  //     console.error("Error fetching space event:", err);
  //     setError("Failed to fetch space event. Please try again.");
  //     setShowResult(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const searchEvent = async () => {
  if (!selectedDate) return;

  // ✅ Check valid date before sending
  const dateObj = new Date(selectedDate);
  if (isNaN(dateObj.getTime())) {
    setError("Invalid date selected. Please choose a valid date.");
    setShowResult(true);
    return;
  }

  setLoading(true);
  setError(null);
  setShowResult(false);

  try {
    const response = await fetch(`${API_BASE_URL}/space-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate }),
    });

    if (!response.ok) throw new Error("Failed to fetch space event");

    const data = await response.json();

    // ✅ Always show result (even if no event found)
    setEvent(data.found ? data : null);
    setShowResult(true);
  } catch (err) {
    console.error("Error fetching space event:", err);
    setError("Failed to fetch space event. Please try again.");
    setShowResult(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="space-events" className="py-24 px-4 relative bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Space <span className="text-blue-400">History</span>
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Discover historic space events that happened on any day
        </p>

        <div className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <Calendar size={32} />
              <h3 className="text-2xl font-semibold">Pick a Date</h3>
            </div>

            <div className="w-full max-w-md space-y-4">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-400/30 text-white focus:outline-none focus:border-blue-400 transition-colors"
              />

              <button
                onClick={searchEvent}
                disabled={!selectedDate || loading}
                className="w-full px-6 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-400/50 hover:border-blue-400/70 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Search Space Event</span>
                  </>
                )}
              </button>
            </div>

            {showResult && (
              <div className="w-full mt-8 animate-fade-in">
                {error ? (
                  <div className="bg-gradient-to-br from-red-900/40 via-red-800/40 to-red-900/40 border border-red-600/30 rounded-lg p-6 text-center">
                    <p className="text-red-400 text-lg">{error}</p>
                  </div>
                ) : event ? (
                  <div className={`bg-gradient-to-br border rounded-lg p-6 space-y-4 ${
                    event.isIndian 
                      ? "from-orange-900/40 via-green-900/40 to-orange-900/40 border-orange-400/30"
                      : "from-indigo-900/40 via-purple-900/40 to-blue-900/40 border-purple-400/30"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={24} className={event.isIndian ? "text-orange-400" : "text-purple-400"} />
                        <span className="text-sm font-semibold text-gray-300">
                          {event.isIndian ? "INDIAN SPACE EVENT FOUND" : "HISTORIC EVENT FOUND"}
                        </span>
                      </div>
                      {event.isIndian && (
                        <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
                          <Flag size={16} className="text-orange-400" />
                          <span className="text-xs font-semibold text-orange-400">INDIA 🇮🇳</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <h4 className={`text-2xl font-bold ${
                          event.isIndian ? "text-orange-300" : "text-purple-300"
                        }`}>{event.title}</h4>
                        <span className="text-sm text-gray-400">({event.year})</span>
                      </div>
                      
                      <p className="text-gray-200 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-lg p-6 text-center">
                    <p className="text-gray-400 text-lg">
                      No major space event recorded for this date. Try another date to discover historic space moments!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};