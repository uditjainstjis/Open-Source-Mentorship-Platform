import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import MentorProfileContent from "../../components/MentorProfileContent";
import { getMentorById } from "../../lib/mentorService";

export default async function MentorProfilePage({ params }) {
    
    // --- THE FIX IS HERE ---
    // Await params before accessing its properties, as suggested by Next.js
    const resolvedParams = await params;
    const mentorId = resolvedParams.id;
    // --- END FIX ---

    // OR, more concisely (if supported by your specific Next.js version):
    // const mentorId = (await params).id;
    
    // Sticking to the safer multi-line approach:
    // const mentorId = params.id; // <-- This was the line causing the error
    
    const mentorData = await getMentorById(mentorId);

    if (!mentorData) {
        return <div className="text-center p-20">Mentor not found.</div>;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar pathname="/explore" /> 
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    <MentorProfileContent mentor={mentorData} />
                </main>
            </div>
        </div>
    );
}