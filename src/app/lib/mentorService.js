import dbConnect from './dbConnect';
import Mentor from '../models/Mentor';

const DUMMY_MENTORS_ALL = [
    // Udit Jain (Current Mentor candidate)
    { _id: '1', name: 'Udit Jain', role: 'Full Stack Developer at uditjain.in', sessions: 45, reviews: 12, image: 'https://uditjain.in/udit.png', skills: ['Next.js', 'Tailwind', 'MongoDB'], languages: ['English', 'Hindi'], socials: { linkedin: '#', github: '#' }, availability: {}, flag: '🇮🇳' },
    // Suggested Mentors
    { _id: '2', name: 'Ronakkumar Bathani', role: 'Senior Data Engineer at ResMed Digital Health', sessions: 85, reviews: 1, image: 'https://via.placeholder.com/300x200?text=Ronak', skills: ['Data Engineering', 'SQL'], languages: ['English'], socials: {}, availability: {}, flag: '🇺🇸' },
    { _id: '3', name: 'Tasawwer Khurshid', role: 'CEO & Founder at The Nexen FZ. LLC.', sessions: 462, reviews: 54, image: 'https://via.placeholder.com/300x200?text=Tasawwer', skills: ['Leadership', 'Venture'], languages: ['English'], socials: {}, availability: {}, flag: '🇦🇪' },
    { _id: '4', name: 'Omar Elnabalawy', role: 'Senior Product Designer at Master Works', sessions: 88, reviews: 34, image: 'https://via.placeholder.com/300x200?text=Omar', skills: ['Product Design', 'Figma'], languages: ['English'], socials: {}, availability: {}, flag: '🇸🇦' },
    { _id: '5', name: 'Swati Shukla', role: 'Senior Product Manager at Amazon', sessions: 321, reviews: 21, image: 'https://via.placeholder.com/300x200?text=Swati', skills: ['Product Mgmt', 'Strategy'], languages: ['English'], socials: {}, availability: {}, flag: '🇺🇸' },
    { _id: '6', name: 'Marc Gallo', role: 'Creative Director at Self-Employed', sessions: 214, reviews: 86, image: 'https://via.placeholder.com/300x200?text=Marc', skills: ['Creative Direction', 'Branding'], languages: ['English'], socials: {}, availability: {}, flag: '🇮🇹' },
];

// 1. Function for the Home Dashboard (Suggested/Current)
export async function getDashboardMentors() {
    await dbConnect();
    // In a real app: Find top 5 highly rated/recently active mentors
    
    // For now, return the first 5 from the dummy list
    const mentors = DUMMY_MENTORS_ALL.slice(0, 5);
    return JSON.parse(JSON.stringify(mentors));
}

// 2. Function for the Explore Page (All Mentors)
export async function getAllExploreMentors() {
    await dbConnect();
    // In a real app: Find all mentors, maybe with pagination
    
    // For now, return the entire dummy list
    return JSON.parse(JSON.stringify(DUMMY_MENTORS_ALL));
}
// ... existing imports and functions ...

// New function to fetch a single mentor
export async function getMentorById(id) {
    await dbConnect();
    try {
        // Find the mentor based on ID (handle MongoDB ObjectId or use dummy data)
        const mentor = DUMMY_MENTORS_ALL.find(m => m._id === id); 
        // In a real app: const mentor = await Mentor.findById(id).lean();

        if (!mentor) return null;
        
        // Enhance with dummy profile data (since our DB model is simple)
        const detailedMentor = {
            ...mentor,
            // Additional fields for the profile page
            jobTitle: mentor.role.split(' at ')[0],
            company: mentor.role.split(' at ')[1] || 'Self-Employed',
            coFounderDetails: "Co-founder and Design Head at Arize Digital | UX Mentor at ImaginXP and UMO India",
            reviewsCount: mentor.reviews,
            achievementsCount: 21,
            totalMentoringTime: '8,550 mins',
            sessionsCompleted: 285,
            profileInsights: [
                { icon: 'Top50', title: 'Top 50 in Graphic Design', period: 'Jul 2025 - Sep 2025' },
                { icon: 'Star', title: 'Clear Communicator', desc: '100% of connections agree that they are great at communication.' },
                { icon: 'Shield', title: 'Perfect Presence', desc: 'Mentor is prompt and highly responsive.' },
            ],
            backgroundExpertise: ['Design', 'Product'],
            disciplines: ['Graphic Design', 'UX Design', '+9'],
            industries: ['Tech', 'Creatives'],
            experienceHistory: [{ title: mentor.role, company: mentor.company, period: 'SEP 2020 - PRESENT' }]
        };

        return JSON.parse(JSON.stringify(detailedMentor));

    } catch (error) {
        console.error("Error fetching mentor by ID:", error);
        return null;
    }
}