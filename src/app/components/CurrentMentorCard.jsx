import React from "react";
import { Phone, Video, MessageSquare } from "lucide-react";

// Accept 'mentor' object as a prop
export default function CurrentMentorCard({ mentor }) {
  // Use optional chaining/defaults in case the data is missing
  const name = mentor?.name || "Nick J.";
  const role = mentor?.role || "SDE at AsyncAPI";
  const image = mentor?.image || "https://via.placeholder.com/300x200";

  return (
    <div className="p-4 border border-blue-400 rounded-lg bg-white w-full max-w-sm">
      <h2 className="font-semibold text-lg mb-2">Your current mentor</h2>
      <img
        // Use dynamic image
        src={image}
        alt={name}
        className="rounded-lg mb-3"
      />
      <div>
        {/* Use dynamic name */}
        <h3 className="font-semibold">{name}</h3>
        {/* Use dynamic role */}
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
      <div className="flex gap-3 mt-3">
        {/* ... (Contact buttons remain the same) ... */}
        <button className="p-2 bg-teal-50 rounded-full">
          <Phone className="text-teal-700" size={20} />
        </button>
        <button className="p-2 bg-teal-50 rounded-full">
          <Video className="text-teal-700" size={20} />
        </button>
        <button className="p-2 bg-teal-50 rounded-full">
          <MessageSquare className="text-teal-700" size={20} />
        </button>
      </div>
      <span className="mt-2 text-sm text-green-600 flex items-center gap-1">
        <span className="w-2 h-2 bg-green-600 rounded-full"></span> Online
      </span>
    </div>
  );
}