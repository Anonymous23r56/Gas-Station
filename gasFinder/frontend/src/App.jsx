import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import Card from "./Components/Card";
import ChartModal from "./Components/ChartModal";
import SignUp from "./Components/SignUp";
import { gasFinderApi } from "./api/gasFinderApi";

//
const PROD_BACKEND_URL = "https://gas-station-mnar.onrender.com"; 
// Example: "https://gas-finder-backend.onrender.com"
//

const App = () => {
  const [gasStations, setGasStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch gas stations on component mount
  useEffect(() => {
    fetchGasStations();
  }, []);

  const fetchGasStations = async () => {
    try {
      setLoading(true);
      const data = await gasFinderApi.getAllStations();

      // Transform backend data to match frontend format
      const transformedData = data.map((station) => ({
        id: station.id,
        name: station.name,
        location: station.address,
        price: station.price_kg,
        image: "/images/gasImage.jpg",
        isActive: station.status === "Open",
        status: station.status,
        latitude: station.latitude,
        longitude: station.longitude,
        lastUpdated: station.last_updated,
      }));

      setGasStations(transformedData);
      setError(null);
    } catch (err) {
      setError(
        "Failed to load gas stations. Make sure backend is running on port 5000."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinChat = (station) => {
    setSelectedStation(station);

    // Check if user is logged in
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

  const handleSearch = (query) => {
    if (!query.trim()) {
      fetchGasStations();
      return;
    }

    // Filter stations locally by name or location
    const filtered = gasStations.filter(
      (station) =>
        station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.location.toLowerCase().includes(query.toLowerCase())
    );

    setGasStations(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <SearchBar onSearch={handleSearch} />
        <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
          <p className="text-xl">Loading gas stations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <SearchBar onSearch={handleSearch} />
        <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
          <p className="text-xl text-red-500">{error}</p>
          <button
            onClick={fetchGasStations}
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

      {/* Cards section */}
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
              No gas stations found
            </p>
          )}
        </div>
      </div>

      {/* Modals */}
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

