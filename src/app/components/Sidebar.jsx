import React from "react";
import {
  Home,
  Compass,
  MessageSquareText,
  Clock
} from "lucide-react"; // npm install lucide-react

export default function Sidebar() {
  const menuItems = [
    { icon: <Home className="w-6 h-6 text-teal-800" />, label: "Home" },
    { icon: <Compass className="w-6 h-6 text-teal-800" />, label: "Explore" },
    { icon: <MessageSquareText className="w-6 h-6 text-teal-800" />, label: "Messages" },
    { icon: <Clock className="w-6 h-6 text-teal-800" />, label: "Bookings" },
  ];

  return (
    <aside className="h-screen w-48 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-teal-800 mb-8">MentOS</h1>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            {item.icon}
            <span className="text-sm font-medium mt-1 text-gray-800">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
