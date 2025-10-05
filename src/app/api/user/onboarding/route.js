import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function POST(request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { step1, step2, step3, step4 } = await request.json(); // Adjusted input structure

  await dbConnect();

  try {
    const updateData = {
      // Step 1: Basic Info
      name: step1.fullName,
      role: step1.currentRole, // Storing current role/student status
      
      // Step 2: Background & Skills
      techLevel: step2.techBackground,
      skills: step2.topSkills,
      
      // Step 3: Goals (Subjective Text)
      goalDescription: step3.subjectiveGoal,
      
      // Step 4: Final Step (Links - Non-compulsory)
      linkedin: step4.linkedinUrl,
      github: step4.githubUrl,
      resumeLink: step4.resumeLink, // Renamed from 'resume'
    };
    
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found in DB' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Onboarding completed successfully', user }, { status: 200 });

  } catch (error) {
    console.error('Onboarding submission error:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  }
}