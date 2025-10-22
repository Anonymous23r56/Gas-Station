import React, { useState } from "react";
// import { gasFinderApi } from "../api/gasFinderApi"; // No longer needed, we'll use fetch

// --- Use the same live URL from your App.jsx ---
const PROD_BACKEND_URL = "https://gas-station-mnar.onrender.com";

function SellerSignUpModal({ onClose, onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    ownerName: "",
    stationName: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    pricePerKg: "",
  });
  
  // --- NEW: State to hold any registration errors ---
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    // This is the data your backend expects
    const stationData = {
      name: formData.stationName,
      address: formData.address,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      price_kg: parseFloat(formData.pricePerKg),
      status: "Open", // Default to "Open"
      // Note: Your backend doesn't save ownerName or phone yet,
      // but that's okay. We're still sending the required data.
    };

    console.log("Sending seller data:", stationData);

    try {
      // --- UPDATED: Use fetch to POST to your live URL ---
      const response = await fetch(`${PROD_BACKEND_URL}/api/stations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stationData),
      });

      if (!response.ok) {
        // If the server returns an error (like 400 or 500)
        const errorData = await response.json();
        console.error("Failed to register station:", errorData);
        setError(errorData.error || "Failed to register. Please try again.");
        return; // Stop the function here
      }

      // If we are here, it was successful!
      const newStation = await response.json();
      console.log("Successfully registered:", newStation);
      
      onSignUpSuccess(); // This closes the modal and shows the chat

    } catch (err) {
      // This catches network errors (e.g., backend is down)
      console.error("Error in handleSubmit:", err);
      setError("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Join as a Seller</h2>
          <p className="text-gray-600">
            Register your gas station and start connecting with customers
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Owner Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Owner Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Station Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Gas Station Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="stationName"
              value={formData.stationName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., My Gas Place"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 13 Femi Street, Lagos"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., +2348123456789"
            />
          </div>

          {/* Location (Latitude & Longitude) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Latitude <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 6.5244"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Longitude <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 3.3792"
              />
            </div>
          </div>

          {/* Price per KG */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price per KG (₦) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="pricePerKg"
              value={formData.pricePerKg}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 850"
            />
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              📍 <strong>Tip:</strong> You can find your location coordinates
              using Google Maps. Right-click on your location and select "What's
              here?" to see the coordinates.
            </p>
          </div>

          {/* --- NEW: Error message display --- */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold"
          >
            Register Gas Station
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?
          <button className="text-blue-500 font-semibold hover:underline">
            Log in to your dashboard
          </button>
        </p>
      </div>
    </div>
  );
}

export default SellerSignUpModal;
