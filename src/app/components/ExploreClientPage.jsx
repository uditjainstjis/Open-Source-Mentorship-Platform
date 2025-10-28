'use client';

import React, { useState, useMemo, useCallback } from 'react';
import MentorCard from "./MentorCard";
import ExploreHeader from "./ExploreHeader";
import { MentorCardSkeleton } from "./ui/skeleton";
import { Search } from 'lucide-react';

// Define the categories exactly as in ExploreHeader
const CATEGORY_MAP = {
    "All": null,
    "New": (m) => m.reviews < 5,
    "Available ASAP": (m) => m.isAvailableASAP,
    "Notable": (m) => m.isTopRated,
    "AI": (m) => m.skills.includes('AI') || m.skills.includes('Machine Learning'),
    "Soft Skills": (m) => m.skills.includes('Leadership') || m.skills.includes('Communication'),
    "Design": (m) => m.skills.includes('Design') || m.skills.includes('Figma'),
    "Product": (m) => m.skills.includes('Product Mgmt') || m.skills.includes('Strategy'),
    // ... add logic for other categories
};

export default function ExploreClientPage({ initialMentors }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSearchLoading, setAiSearchLoading] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState(null); // Stores IDs matched by AI

  // 1. Filter Logic
  const filteredMentors = useMemo(() => {
    let list = initialMentors;
    
    // Apply category filter
    const filterFn = CATEGORY_MAP[activeCategory];
    if (filterFn) {
        list = list.filter(filterFn);
    }
    
    // Apply standard text search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      list = list.filter(mentor =>
        mentor.name.toLowerCase().includes(lowerSearch) ||
        mentor.role.toLowerCase().includes(lowerSearch) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(lowerSearch))
      );
    }

    // Apply AI search results if available
    if (aiSearchResults) {
        const aiIds = new Set(aiSearchResults);
        list = list.filter(mentor => aiIds.has(mentor._id));
    }

    return list;
  }, [initialMentors, activeCategory, searchTerm, aiSearchResults]);

  // 2. AI Search Handler
  const handleAiSearch = useCallback(async () => {
    if (!searchTerm) return;
    setAiSearchLoading(true);
    setAiSearchResults(null);
    
    try {
        const response = await fetch('/api/search/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchTerm, mentorIds: initialMentors.map(m => m._id) }),
        });
        
        if (!response.ok) {
            throw new Error('AI Search failed');
        }
        
        const data = await response.json();
        
        // Data should return an array of Mentor IDs that match the sophisticated query
        setAiSearchResults(data.matchedIds || []); 
        
    } catch (error) {
        console.error("Error during AI search:", error);
        alert("AI Search failed. Check console for details.");
        setAiSearchResults([]); // Clear previous results
    } finally {
        setAiSearchLoading(false);
    }
  }, [searchTerm, initialMentors]);


  return (
    <div className="p-8">
        {/* Pass state handlers to the header */}
        <ExploreHeader 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAiSearch={handleAiSearch}
            aiSearchLoading={aiSearchLoading}
        />

// Inside ExploreClientPage.jsx return statement, within the Mentor Grid section:

{/* AI Search Loading Indicator */}
{aiSearchLoading && (
    <div className="flex items-center justify-center gap-4 text-blue-600 mb-6 p-4 border border-blue-200 bg-blue-50 rounded-lg col-span-4">
        <Search size={24} className="animate-spin-slow" /> 
        <p className="text-lg font-medium">
            AI is analyzing your request. Matching skills and experiences...
        </p>
    </div>
)}

{/* ... rest of the Mentor Grid ... */}

        {/* Mentor Grid */}
        <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">
                {filteredMentors.length} Mentors Found
            </h3>
            
            {aiSearchLoading && (
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Search size={18} className="animate-pulse" /> AI is filtering results...
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {aiSearchLoading ? (
                    // Show skeleton loaders while AI search is processing
                    Array.from({ length: 8 }).map((_, index) => (
                        <MentorCardSkeleton key={index} />
                    ))
                ) : filteredMentors.length > 0 ? (
                    filteredMentors.map((mentor) => (
                        <MentorCard key={mentor._id} {...mentor} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-4">No mentors match your current criteria.</p>
                )}
            </div>
        </div>
    </div>
  );
}