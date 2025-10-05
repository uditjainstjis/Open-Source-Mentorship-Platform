'use client'; 
import React, { useState, useEffect } from "react";
import CurrentMentorCard from "./CurrentMentorCard";
import MentorCard from "./MentorCard";
import { Loader2 } from 'lucide-react'; 
import { useAuth } from "@clerk/nextjs"; 
// Import Fallback Data
import { FALLBACK_MENTOR_LIST } from './FallbackData'; 

// Helper function to format mentor data
function formatMentorData(mentor) {
    return {
        ...mentor,
        company: mentor.role?.split(' at ')[1] || '', 
        role: mentor.role?.split(' at ')[0] || mentor.role || '',
        experience: `${Math.floor(Math.random() * 15) + 5} years`, 
        attendance: `${Math.floor(Math.random() * 20) + 80}%`, 
        isTopRated: mentor.reviews > 50, 
        isAvailableASAP: mentor.sessions < 100, 
        flag: mentor.flag || '🇺🇸',
    };
}

export default function MainContent() {
  const { getToken, isLoaded, isSignedIn } = useAuth(); 
  
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAuthError, setHasAuthError] = useState(false); // New state to track 401/404

  useEffect(() => {
    async function fetchData() {
      if (!isLoaded || !isSignedIn) {
        setLoading(false);
        setHasAuthError(true); // Treat signed-out state as an "Auth Error" for display purposes
        return; 
      }
      
      setLoading(true);
      setHasAuthError(false);
      
      const token = await getToken(); 

      try {
        const response = await fetch('/api/mentors/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        
        if (!response.ok) {
          // If 401, 404, or 500 happens, we capture the error silently
          setHasAuthError(true); 
          // CRITICAL: We DO NOT throw an error here to prevent the component from crashing.
        } else {
            const data = await response.json();
            setMentors(data);
        }

      } catch (err) {
        console.error("Silent Fetch Error:", err);
        setHasAuthError(true); // Capture network errors silently
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isLoaded, isSignedIn, getToken]); 

  // --- Determine Mentors to Display ---
  const mentorsToDisplay = hasAuthError ? FALLBACK_MENTOR_LIST : mentors;
  
  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-teal-600 mr-2" size={32} />
        <p className="text-gray-600">Loading suggested mentors...</p>
      </div>
    );
  }
  
  // Guard against completely empty array (even if fallback failed)
  if (mentorsToDisplay.length === 0) {
    return <div className="p-8">No mentors available at this time.</div>;
  }
  
  // Separate Current Mentor and Suggested Mentors
  const [currentMentor, ...suggestedMentors] = mentorsToDisplay;

  // Use the original formatMentorData helper, it handles missing fields
  const currentMentorFormatted = formatMentorData(currentMentor);
  const suggestedMentorsFormatted = suggestedMentors.map(formatMentorData);


  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Optional: Add a subtle visual hint if using fallback data */}
      {hasAuthError && (
          <div className="p-2 text-sm bg-yellow-100 text-yellow-800 rounded">
              Note: Could not connect to personalized data. Showing cached results.
          </div>
      )}
      
      {/* Top Section */}
      <div className="flex gap-6 justify-between">
        <CurrentMentorCard mentor={currentMentorFormatted} /> 
      </div>

      {/* Suggested Mentors */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Suggested Mentors</h2>
        <div className="flex gap-6 flex-wrap">
          {suggestedMentorsFormatted.map((mentor) => (
            <MentorCard key={mentor._id} {...mentor} />
          ))}
        </div>
      </div>
    </div>
  );
}