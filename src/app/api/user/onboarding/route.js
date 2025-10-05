import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

// --- DEVELOPMENT SIMULATION CONSTANTS ---
const IS_DEV = process.env.NODE_ENV === 'development';
// MUST match the ID used in the GET /status route
const DEV_USER_ID = 'user_dev_simulated_id_12345'; 
// ----------------------------------------


export async function POST(request) {
  const { userId: clerkUserId } = auth(); // Get the actual Clerk ID
  let finalUserId = clerkUserId;

  // 1. --- DEVELOPMENT BYPASS CHECK ---
  if (!finalUserId && IS_DEV) {
    console.warn("DEV MODE: Bypassing Clerk auth check for POST and simulating user ID.");
    finalUserId = DEV_USER_ID; 
  }
  // ------------------------------------
  
  // 2. Authorization Check (Uses real ID or simulated ID)
  if (!finalUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { step1, step2, step3, step4 } = await request.json(); 

  await dbConnect();

  try {
    const updateData = {
      // Step 1: Basic Info
      name: step1.fullName,
      role: step1.currentRole,
      
      // Step 2: Background & Skills
      techLevel: step2.techBackground,
      skills: step2.topSkills,
      
      // Step 3: Goals (Subjective Text)
      goalDescription: step3.subjectiveGoal,
      
      // Step 4: Final Step (Links - Non-compulsory)
      linkedin: step4.linkedinUrl,
      github: step4.githubUrl,
      resumeLink: step4.resumeLink, 
    };
    
    // 3. Update the User based on the Final User ID
    const user = await User.findOneAndUpdate(
      { clerkId: finalUserId }, // Use finalUserId here
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      // In development, the user should have been created by the GET /status call
      return NextResponse.json({ message: 'User not found in DB' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Onboarding completed successfully', user }, { status: 200 });

  } catch (error) {
    console.error('Onboarding submission error:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  }
}