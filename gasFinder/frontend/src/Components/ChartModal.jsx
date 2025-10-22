import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

function ChatModal({ station, onClose }) {
  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            {/* Back Arrow */}
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <IoIosArrowRoundBack />
            </button>
            <h2 className="font-bold text-lg">{station.name}</h2>
          </div>
          {/* Active Button at extreme right */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Active
          </button>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Sample messages */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold">John D</p>
              <p className="text-xs text-gray-500">10:23 AM</p>
              <p className="bg-gray-100 rounded-lg p-3 mt-1">
                Hi, I'm on my way is there still gas?
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              SM
            </div>
            <div>
              <p className="text-sm font-semibold">Sam M</p>
              <p className="text-xs text-gray-500">11:23 AM</p>
              <p className="bg-gray-100 rounded-lg p-3 mt-1">Yes oooo</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              PE
            </div>
            <div>
              <p className="text-sm font-semibold">Precious E</p>
              <p className="text-xs text-gray-500">11:30 AM</p>
              <p className="bg-gray-100 rounded-lg p-3 mt-1">
                I heard there's a queue, is that true?
              </p>
            </div>
          </div>

          {/* Your message (right side) */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
              Yeah there's a queue
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
