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