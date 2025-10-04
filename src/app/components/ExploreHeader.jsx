import React from 'react';
import { Search, Sparkles } from 'lucide-react';

const categories = [
    { label: "All", icon: "🔴", badge: false },
    { label: "New", icon: "✨", badge: true },
    { label: "Available ASAP", icon: "⚡", badge: false },
    { label: "Notable", icon: "🏆", badge: true },
    { label: "AI", icon: "⭐", badge: true },
    { label: "Soft Skills", icon: "✍️", badge: false },
    { label: "Design", icon: "🖌️", badge: false },
    { label: "Product", icon: "📦", badge: false },
    { label: "Engineering", icon: "💻", badge: false },
    { label: "Marketing", icon: "📢", badge: false },
    { label: "Data Science", icon: "📈", badge: false },
    { label: "Content Writi", icon: "✒️", badge: false },
];

export default function ExploreHeader({
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    onAiSearch,
    aiSearchLoading
}) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Tabs: Mentors | Group Sessions (unchanged) */}
            <div className="flex border-b-2 border-gray-200 mb-4">
                <button className="px-4 pb-2 text-lg font-semibold border-b-4 border-blue-500 text-blue-800 transition-colors">
                    Mentors
                </button>
                <button className="px-4 pb-2 text-lg font-semibold text-gray-500 hover:text-blue-800 transition-colors">
                    Group Sessions
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6 flex items-center border border-gray-300 rounded-xl p-3 bg-white">
                <Search className="text-gray-400 w-5 h-5 mr-3" />
                <input
                    type="text"
                    placeholder="Search by name, company, role, or ask a question..."
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
                    onClick={onAiSearch}
                    disabled={aiSearchLoading || !searchTerm}
                >
                    {aiSearchLoading ? 'Searching...' : (<><Sparkles size={16} /> Try AI Search</>)}
                </button>
            </div>

            {/* Category Filters (Click Handler Added) */}
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category, index) => {
                    const isActive = category.label === activeCategory;
                    return (
                        <div 
                            key={index} 
                            className="flex-shrink-0 flex flex-col items-center cursor-pointer group"
                            onClick={() => setActiveCategory(category.label)}
                        >
                            {/* Icon */}
                            <div 
                                className={`w-12 h-12 rounded-full flex items-center justify-center relative transition-colors
                                ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'} 
                                hover:bg-gray-200`}
                            >
                              {category.icon}
                              {category.badge && (
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                              )}
                            </div>
                            {/* Label */}
                            <span 
                                className={`text-xs mt-1 ${isActive ? 'text-black font-semibold' : 'text-gray-600'}`}
                            >
                                {category.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}