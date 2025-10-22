import React from "react";

function Card({ station, onJoinChat }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-transparent hover:border-blue-600 transition">
      {/*image with Active/Inactive Badge */}
      <div className="relative h-40">
        <img
          src={station.image}
          alt={station.name}
          className="w-full h-full object-cover"
        />
        {/*badge - Green if Active, Red if Inactive */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-semibold
            ${station.isActive ? "bg-green-500" : "bg-red-500"}`}
        >
          {station.isActive ? "Active" : "Closed"}
        </div>
      </div>

      {/* card  */}
      <div className="p-4">
        <h3 className="font-bold text-base mb-2">{station.name}</h3>

        <div className="space-y-1 text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">📍 {station.location}</div>
          {/* Only show phone if it exists and is not "N/A" */}
          {station.phone && station.phone !== "N/A" && (
            <div className="flex items-center gap-1">📞 {station.phone}</div>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold">#{station.price}/kg</span>
        </div>

        {/* join chat */}
        <button
          onClick={onJoinChat}
          disabled={!station.isActive}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition
            ${
              station.isActive
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {station.isActive ? "Join Chat" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default Card;
