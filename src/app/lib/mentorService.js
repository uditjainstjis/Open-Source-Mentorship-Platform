import dbConnect from './dbConnect';
import Mentor from '../models/Mentor';
import User from '../models/User';
import mongoose from 'mongoose'; 

// --- UTILITIES FOR USER/CLERK SYNCHRONIZATION ---

/**
 * Finds a user by Clerk ID or creates a new one with default suggestions.
 */
export async function findOrCreateUser(clerkId, email, name = '') {
    await dbConnect();
    
    let user = await User.findOne({ clerkId }).lean();
    
    if (!user) {
        // Fetch some general mentors to populate the initial suggested list (before onboarding)
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


// --- DASHBOARD DATA FETCHING (The missing function!) ---

/**
 * Fetches the user's specific list of suggested mentors based on their User document.
 * This function is called by the /api/mentors/dashboard route.
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
            .select('suggestedMentorIds') 
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


// --- AI Matching Utility ---

/**
 * Uses the AI utility to find suggested mentors based on user profile.
 */
export async function generateInitialMentorSuggestions(userProfile) {
    await dbConnect(); 
    
    try {
        const allMentors = await Mentor.find({}).select('name role skills').lean();
        
        if (allMentors.length === 0) return [];

        const mentorContext = allMentors.map(m => 
            `ID: ${m._id.toString()}, Name: ${m.name}, Role: ${m.role}, Skills: ${m.skills.join(', ')}`
        ).join('\n');

        const userQuery = `
            I am a user with the following background:
            Level: ${userProfile.techLevel}
            Skills: ${userProfile.skills.join(', ')}
            Goal: ${userProfile.goalDescription}
            Analyze the Mentor List and find the top 5 mentors.
        `;
        
        // Import the AI utility function (assuming relative path './gemini' is correct)
        const { findMentorsByAI } = await import('./gemini'); 
        
        const matchedIds = await findMentorsByAI(userQuery, allMentors); 
        
        const validMatchedIds = matchedIds.filter(id => mongoose.Types.ObjectId.isValid(id));
        
        return validMatchedIds.slice(0, 5);

    } catch (error) {
        console.error("AI Generation Error: Falling back to random mentors.", error);
        
        const fallbackMentors = await Mentor.aggregate([
            { $sample: { size: 3 } },
            { $project: { _id: 1 } }
        ]);
        
        return fallbackMentors.map(m => m._id); 
    }
}


// --- EXPLORE AND PROFILE FETCHING FUNCTIONS ---

/**
 * Fetches all available mentors for the Explore page.
 */
export async function getAllExploreMentors() {
    await dbConnect();
    try {
        const mentors = await Mentor.find({}).lean();
        return JSON.parse(JSON.stringify(mentors)); 
    } catch (error) {
        console.error("Error fetching all explore mentors:", error);
        return []; 
    }
}


/**
 * Fetches a single mentor's detailed data for the profile page.
 */
export async function getMentorById(id) {
    await dbConnect();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null; 
    }

    try {
        const mentor = await Mentor.findById(id).lean();

        if (!mentor) return null;
        
        // --- DATA ENHANCEMENT (Keep static/placeholder fields here) ---
        const detailedMentor = {
            ...mentor,
            jobTitle: mentor.role.split(' at ')[0],
            company: mentor.role.split(' at ')[1] || 'Self-Employed',
            coFounderDetails: "Placeholder details...",
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