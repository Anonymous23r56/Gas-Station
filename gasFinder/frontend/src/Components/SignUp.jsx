import React from "react";

function SignUpModal({ onClose, onSignUpSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
   
    onSignUpSuccess(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Hi there!</h2>
          <p className="text-gray-600">Welcome to GasFinder</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already a user?{" "}
          <button className="text-blue-500 font-semibold hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
