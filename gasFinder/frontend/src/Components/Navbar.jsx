import React, { useState } from "react";
import SellerSignUp from "./SellerSignUp";

const Navbar = () => {
  const [showSellerModal, setShowSellerModal] = useState(false);

  const handleJoinAsSeller = () => {
    setShowSellerModal(true);
  };

  const handleCloseSellerModal = () => {
    setShowSellerModal(false);
  };

  const handleSellerSignUpSuccess = () => {
    setShowSellerModal(false);
    alert(
      "Successfully registered as a seller! You can now add your gas station."
    );
   
  };

  return (
    <>
      <nav className="w-full h-20 border-b border-l border-r border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="font-semibold text-xl">GasFinder</span>
          </div>

          {/* Join as Seller Button */}
          <button
            onClick={handleJoinAsSeller}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Join as a seller
          </button>
        </div>
      </nav>

      {/* Seller Sign Up Modal */}
      {showSellerModal && (
        <SellerSignUp
          onClose={handleCloseSellerModal}
          onSignUpSuccess={handleSellerSignUpSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
