import dbConnect from './dbConnect';
import Mentor from '../models/Mentor';
import User from '../models/User';
import mongoose from 'mongoose'; // Needed for type checking/casting IDs

// --- UTILITIES FOR USER/CLERK SYNCHRONIZATION ---

/**
 * Finds a user by Clerk ID or creates a new one with default suggestions.
 */
export async function findOrCreateUser(clerkId, email, name = '') {
    await dbConnect();
    
    let user = await User.findOne({ clerkId }).lean();
    
    if (!user) {
        // 1. Fetch some general mentors to populate the initial suggested list
        const initialMentors = await Mentor.find({}).limit(4).select('_id').lean();
        const defaultSuggestions = initialMentors.map(m => m._id);
        
        user = await User.create({
            clerkId,
            email,
            name: name || email.split('@')[0],
            suggestedMentorIds: defaultSuggestions,
        });
        user = user.toObject();
    }
    
    return JSON.parse(JSON.stringify(user));
}


// --- DATA FETCHING FUNCTIONS ---

/**
 * Fetches the user's specific list of suggested mentors based on their User document.
 * @param {string} clerkId - The unique ID provided by Clerk.
 */
export async function getDashboardMentors(clerkId) {
    if (!clerkId) {
        console.error("Clerk ID required for dashboard fetch.");
        return [];
    }
    
    await dbConnect();
    
    try {
        // 1. Find the user and populate the full Mentor documents from the suggestedMentorIds array
        const user = await User.findOne({ clerkId })
            .select('suggestedMentorIds') // Only retrieve the IDs list
            .populate('suggestedMentorIds') 
            .lean();

        if (!user || !user.suggestedMentorIds) {
            return [];
        }

        // The result of population is user.suggestedMentorIds (an array of mentor objects)
        const suggestedMentors = user.suggestedMentorIds;
        
        return JSON.parse(JSON.stringify(suggestedMentors));

    } catch (error) {
        console.error("Error fetching personalized dashboard mentors:", error);
        return []; 
    }
}


/**
 * Fetches all available mentors for the Explore page.
 */
export async function getAllExploreMentors() {
    await dbConnect();
    try {
        // Fetch all mentors from the database
        const mentors = await Mentor.find({}).lean();
        return JSON.parse(JSON.stringify(mentors)); 

    } catch (error) {
        console.error("Error fetching all explore mentors:", error);
        return []; 
    }
}


/**
 * Fetches a single mentor's detailed data for the profile page.
 * @param {string} id - The MongoDB ObjectId of the mentor.
 */
export async function getMentorById(id) {
    await dbConnect();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null; // Ensure ID is valid before querying
    }

    try {
        // Fetch the mentor by ID
        const mentor = await Mentor.findById(id).lean();

        if (!mentor) return null;
        
        // --- DATA ENHANCEMENT (Keep static/placeholder fields here) ---
        // Since the DB only holds core fields, we add display fields here:
        const detailedMentor = {
            ...mentor,
            jobTitle: mentor.role.split(' at ')[0],
            company: mentor.role.split(' at ')[1] || 'Self-Employed',
            coFounderDetails: "Placeholder for Co-founder role details...",
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
        console.error(`Error fetching mentor ${id}:`, error);
        return null;
    }
}