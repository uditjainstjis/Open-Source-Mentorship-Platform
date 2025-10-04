// MainContent.jsx
import React from "react";
import CurrentMentorCard from "./CurrentMentorCard";
import MentorCard from "./MentorCard";
// IMPORTANT: Use the correct service function
import { getDashboardMentors } from "../lib/mentorService"; 

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


export default async function MainContent() {
  
  // Fetch data specific for the dashboard
  const allMentors = await getDashboardMentors();

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