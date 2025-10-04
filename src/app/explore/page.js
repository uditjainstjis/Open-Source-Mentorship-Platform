import Sidebar from "./../components/Sidebar";
import Navbar from "./../components/Navbar";
import ExploreClientPage from "./../components/ExploreClientPage"; // Import the client component
import { getAllExploreMentors } from '../lib/mentorService'; 

// Helper function (keep mapping logic here)
function formatMentorData(mentor) {
    // ... (same implementation as before)
    return {
        ...mentor,
        company: mentor.role.split(' at ')[1] || '', 
        role: mentor.role.split(' at ')[0] || mentor.role,
        experience: `${Math.floor(Math.random() * 15) + 5} years`, 
        attendance: `${Math.floor(Math.random() * 20) + 80}%`, 
        isTopRated: mentor.reviews > 50, 
        isAvailableASAP: mentor.sessions < 100, 
        flag: mentor.flag || '🇺🇸',
    };
}


export default async function ExplorePage() {
    // 1. Fetch data on the server
    const allMentors = await getAllExploreMentors();
    const formattedMentors = allMentors.map(formatMentorData);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar pathname="/explore" /> 
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    {/* 2. Pass data to the Client Component for interactivity */}
                    <ExploreClientPage initialMentors={formattedMentors} />
                </main>
            </div>
        </div>
    );
}