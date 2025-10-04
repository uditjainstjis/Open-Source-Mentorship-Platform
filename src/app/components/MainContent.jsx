'use client'; // <-- Now a Client Component
import React, { useState, useEffect } from "react";
import CurrentMentorCard from "./CurrentMentorCard";
import MentorCard from "./MentorCard";
import { Loader2 } from 'lucide-react'; // Assuming you have lucide-react installed

// Move helper function outside the component
const formatMentorData = (mentor) => ({
    ...mentor,
    company: mentor.role.split(' at ')[1] || '',
    role: mentor.role.split(' at ')[0] || mentor.role,
    experience: `${Math.floor(Math.random() * 15) + 5} years`, 
    attendance: `${Math.floor(Math.random() * 20) + 80}%`, 
    isTopRated: mentor.reviews > 50,
    isAvailableASAP: mentor.sessions < 100,
    flag: mentor.flag || '🇺🇸',
});


export default function MainContent() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from the new API route
        const response = await fetch('/api/mentors/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard mentors');
        }
        
        const data = await response.json();
        setMentors(data);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-teal-600 mr-2" size={32} />
        <p className="text-gray-600">Loading suggested mentors...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-600">Error loading data: {error}</div>;
  }
  
  const allMentors = mentors;
  
  if (allMentors.length === 0) {
    return <div className="p-8">No mentors available yet.</div>;
  }
  
  // Separate Current Mentor and Suggested Mentors
  const [currentMentor, ...suggestedMentors] = allMentors;

  const currentMentorFormatted = formatMentorData(currentMentor);
  const suggestedMentorsFormatted = suggestedMentors.map(formatMentorData);


  return (
    <div className="p-8 flex flex-col gap-8">
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