import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

// --- DEVELOPMENT SIMULATION ---
const IS_DEV = process.env.NODE_ENV === 'development';
const DEV_USER_ID = 'user_dev_simulated_id_12345'; // Use a unique placeholder ID

export async function GET() {
  
  const { userId, sessionClaims } = auth();
  let finalUserId = userId;

  // 1. --- DEVELOPMENT BYPASS CHECK ---
//   if (!finalUserId && IS_DEV) {
//     console.warn("DEV MODE: Bypassing Clerk auth check and simulating user ID.");
//     finalUserId = DEV_USER_ID; // Use simulated ID for local testing
//   }
  // ------------------------------------

  // 2. Authorization Check (Uses real ID or simulated ID)
  if (!finalUserId) {
    // If we're in production OR dev and still can't find a user, unauthorized.
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // --- Use finalUserId for all subsequent logic ---

  await dbConnect();

  try {
    // 3. Look up user (using finalUserId)
    let user = await User.findOne({ clerkId: finalUserId }).select('skills email name').lean();

    // 4. User Creation / Sync Logic (using finalUserId)
    if (!user) {
      console.log(`Creating initial DB record for simulated user: ${finalUserId}`);
      // Fallback email/name for development simulation
      const email = `${finalUserId}@dev.com`;
      const name = "Dev User";

      user = await User.create({
        clerkId: finalUserId,
        email: email,
        name: name,
      });
      user = user.toObject();
    }
    
    // 5. Determine Setup Status
    const hasSkills = user.skills && user.skills.length > 0;

    // 6. Success Response
    return NextResponse.json({ 
      isSetupComplete: hasSkills,
      clerkId: finalUserId,
      userName: user.name,
    }, { status: 200 });

  } catch (error) {
    console.error(`[API/USER/STATUS] Database error for user ${finalUserId}:`, error);
    // If DB fails, we still need to assume setup is incomplete to force form display
    return NextResponse.json({ 
        isSetupComplete: false, 
        message: 'DB Error, forcing setup form.' 
    }, { status: 500 });
  }
}