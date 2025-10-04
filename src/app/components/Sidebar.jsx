import React from "react";
import Link from 'next/link'; 
import {
  Home,
  Compass,
  MessageSquareText,
  Clock
} from "lucide-react"; 

// Accept pathname as a prop
export default function Sidebar({ pathname }) {
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "/explore" }, 
    { icon: MessageSquareText, label: "Messages", href: "/messages" },
    { icon: Clock, label: "Bookings", href: "/bookings" },
  ];

  return (
    <aside className="h-screen w-48 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-teal-800 mb-8">MentOS</h1>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-8">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon; // Get the Lucide component

          return (
            <Link href={item.href} key={index} passHref>
              <div 
                className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-colors 
                            ${isActive 
                              ? 'bg-teal-100 text-teal-800 border-b-2 border-teal-600' // Active style
                              : 'text-gray-800 hover:bg-gray-100'}`} // Inactive style
              >
                <Icon 
                  className={`w-6 h-6 ${isActive ? 'text-teal-800' : 'text-teal-800/70'}`} 
                />
                <span className="text-sm font-medium mt-1">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}