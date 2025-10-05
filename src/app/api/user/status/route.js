import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function GET() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    let user = await User.findOne({ clerkId: userId }).select('skills email name').lean();

    if (!user) {
      // If the user doesn't exist in our DB yet, create a minimal record
      // We assume the primary email is available in sessionClaims
      const email = sessionClaims?.email_addresses[0].email_address || sessionClaims?.email;
      const name = sessionClaims?.first_name ? `${sessionClaims.first_name} ${sessionClaims.last_name}` : email.split('@')[0];

      user = await User.create({
        clerkId: userId,
        email: email,
        name: name,
        // skills field defaults to empty array
      });
      user = user.toObject();
    }
    
    // Check if the user has completed the onboarding (i.e., has skills)
    const hasSkills = user.skills && user.skills.length > 0;

    return NextResponse.json({ 
      isSetupComplete: hasSkills,
      clerkId: userId,
      userEmail: user.email,
      userName: user.name,
    }, { status: 200 });

  } catch (error) {
    console.error('User status check error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}