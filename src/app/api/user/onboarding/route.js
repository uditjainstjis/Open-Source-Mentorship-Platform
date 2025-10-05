import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
// Import the new utility
import { generateInitialMentorSuggestions } from '../../../lib/mentorService'; 

// ... (DEV SIMULATION CONSTANTS remain the same) ...
const IS_DEV = process.env.NODE_ENV === 'development';
const DEV_USER_ID = 'user_dev_simulated_id_12345'; 


export async function POST(request) {
  try {
    // Get auth context using request object
    const { userId: clerkUserId, sessionClaims } = getAuth(request);
    let finalUserId = clerkUserId;

    // DEV BYPASS CHECK (uncomment for development testing)
    if (!finalUserId && IS_DEV) {
      console.warn("DEV MODE: Simulating user ID for onboarding.");
      finalUserId = DEV_USER_ID; 
    }
    
    if (!finalUserId) {
      console.error("Authentication failed: userId is null. User may not be signed in.");
      return NextResponse.json({ 
        message: 'Unauthorized - Please sign in to access this resource',
        isAuthenticated: false 
      }, { status: 401 });
    }

    const { step1, step2, step3, step4 } = await request.json(); 
    await dbConnect();
    
    // Collect user profile data needed for matching
    const userProfileData = {
        name: step1.fullName,
        role: step1.currentRole,
        techLevel: step2.techBackground,
        skills: step2.topSkills,
        goalDescription: step3.subjectiveGoal,
        linkedin: step4.linkedinUrl,
        github: step4.githubUrl,
        resumeLink: step4.resumeLink,
    };
    
    // 1. Save the new user profile data first
    let user = await User.findOneAndUpdate(
      { clerkId: finalUserId },
      { $set: userProfileData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found in DB' }, { status: 404 });
    }

    // 2. --- GENERATE AI SUGGESTIONS ---
    console.log(`Triggering AI matching for user ${finalUserId}...`);
    const suggestedIds = await generateInitialMentorSuggestions(userProfileData);
    
    // 3. Save the generated suggestions back to the user document
    user = await User.findOneAndUpdate(
        { clerkId: finalUserId },
        { $set: { suggestedMentorIds: suggestedIds } },
        { new: true }
    );
    // ------------------------------------

    console.log(`Successfully matched ${suggestedIds.length} mentors.`);
    return NextResponse.json({ message: 'Onboarding and matching completed!', user }, { status: 200 });

  } catch (error) {
    console.error('Onboarding submission error:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  }
}