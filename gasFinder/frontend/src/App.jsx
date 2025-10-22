import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import Card from "./Components/Card";
import ChartModal from "./Components/ChartModal";
import SignUp from "./Components/SignUp";
// import { gasFinderApi } from "./api/gasFinderApi"; // We are now using fetch directly

//
// --- This is your new LIVE Render URL ---
//
const PROD_BACKEND_URL = "https://gas-station-mnar.onrender.com";
//
//

const App = () => {
  const [gasStations, setGasStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store user's location to reset search
  const [userLocation, setUserLocation] = useState(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Geolocation logic
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Save location and fetch nearby
          setUserLocation({ lat: latitude, lon: longitude });
          fetchGasStations(latitude, longitude, null);
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          // Fetch all as fallback
          fetchGasStations(null, null, null);
        }
      );
    } else {
      console.log("Geolocation not supported. Fetching all stations.");
      // Fetch all as fallback
      fetchGasStations(null, null, null);
    }
  }, []); // Runs once on load

  // Helper function to process data
  const processData = (data) => {
    const transformedData = data.map((station) => ({
      id: station.id,
      name: station.name,
      location: station.address,
      price: station.price_kg,
      // Use your project's image path
      image: "/images/gasImage.jpg", 
      isActive: station.status === "Open",
      status: station.status,
      latitude: station.latitude,
      longitude: station.longitude,
      lastUpdated: station.last_updated,
      distance: station.distance_km, // From your /nearby endpoint
    }));

    setGasStations(transformedData);
    setError(null);
  };

  // --- THIS IS THE FINAL VERSION ---
  // It uses your live URL and all our logic.
  const fetchGasStations = async (lat = null, lon = null, query = null) => {
    try {
      setLoading(true);
      
      // --- This logic now uses your LIVE URL ---
      let apiUrl = `${PROD_BACKEND_URL}/api/stations`; // Default
      
      if (query) {
        // Handle search
        apiUrl = `${PROD_BACKEND_URL}/api/stations?query=${encodeURIComponent(query)}`;
      } else if (lat !== null && lon !== null) {
        // Handle nearby
        const radius = 25; // Set default 25km radius
        apiUrl = `${PROD_BACKEND_URL}/api/stations/nearby?lat=${lat}&lon=${lon}&radius=${radius}`;
      }
      // else... it just uses /api/stations (fetches all)

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      processData(data);

    } catch (err) {
      setError(
        // This is the error message the user sees
        "Failed to load gas stations from the server."
      );
      console.error(err); // This is for you in the console
    } finally {
      setLoading(false);
    } 
  };

  const handleJoinChat = (station) => {
    setSelectedStation(station);
    if (isLoggedIn) {
      setShowChatModal(true);
    } else {
      setShowSignUpModal(true);
    }
  };

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
    setShowSignUpModal(false);
    setShowChatModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    setSelectedStation(null);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
    setSelectedStation(null);
  };

  // This makes a new API call
  const handleSearch = (query) => {
    if (!query.trim()) {
      // If search is cleared, reload the initial nearby/all list
      fetchGasStations(userLocation?.lat, userLocation?.lon, null);
      return;
    }
    // If there is a search query, fetch from the search endpoint
    fetchGasStations(null, null, query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
          <p className="text-xl">Finding nearby gas stations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
          <p className="text-xl text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gasStations.length > 0 ? (
            gasStations.map((station) => (
              <Card
                key={station.id}
                station={station}
                onJoinChat={() => handleJoinChat(station)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No gas stations found. Try searching by name or location.
            </p>
          )}
        </div>
      </div>

      {showSignUpModal && (
        <SignUp
          onClose={handleCloseSignUpModal}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}

      {showChatModal && selectedStation && (
        <ChartModal station={selectedStation} onClose={handleCloseChatModal} />
      )}
    </div>
  );
};

export default App;
