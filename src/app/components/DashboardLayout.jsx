// components/DashboardLayout.jsx
// This can remain a Server Component, but now imports a Client Component (MainContent)
import React from 'react';
import Sidebar from "./Sidebar"; 
import Navbar from "./Navbar";
import MainContent from "./MainContent"; // Now a Client Component


export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar remains a Server/Static Component */}
            <Sidebar pathname="/" /> 
            <div className="flex flex-col flex-1">
                {/* Navbar remains a Server/Static Component */}
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    {/* MainContent (Client Component) handles its own API fetching */}
                    <MainContent />
                </main>
            </div>
        </div>
    );
}