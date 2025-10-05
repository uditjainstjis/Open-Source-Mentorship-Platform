import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // <--- CORRECTED: Default import
import User from '../../../models/User';
import { getAuth } from '@clerk/nextjs/server'; 

// --- Helper for development safety (to be removed for final deploy) ---
const IS_DEV = process.env.NODE_ENV === 'development';
const DEV_USER_ID = 'user_dev_simulated_id_12345';
// --------------------------------------------------------------------

export async function GET(request) {
  try {
    // 1. Get auth context using request object
    const { userId: clerkUserId, sessionClaims } = getAuth(request); 
    let finalUserId = clerkUserId;

    // 2. DEV BYPASS CHECK (uncomment for development testing)
    if (!finalUserId && IS_DEV) {
      console.warn("DEV MODE: Simulating user ID.");
      finalUserId = DEV_USER_ID;
    }

    // 3. Final Authorization Check
    if (!finalUserId) {
      console.error("Authentication failed: userId is null. User may not be signed in.");
      return NextResponse.json({ 
        message: 'Unauthorized - Please sign in to access this resource',
        isAuthenticated: false 
      }, { status: 401 });
    }
    
    // Proceed with DB connection and logic using finalUserId
    await dbConnect();
    
    let user = await User.findOne({ clerkId: finalUserId }).select('skills email name').lean();

    if (!user) {
      // User creation logic remains the same (using environment data or defaults)
      const email = sessionClaims?.email || `${finalUserId}@dev.com`;
      const name = sessionClaims?.firstName || "New User";

      user = await User.create({ clerkId: finalUserId, email: email, name: name });
      user = user.toObject();
    }
    
    const hasSkills = user.skills && user.skills.length > 0;

    return NextResponse.json({ 
      isSetupComplete: hasSkills,
      clerkId: finalUserId,
      userName: user.name,
    }, { status: 200 });

  } catch (error) {
    console.error(`[API/USER/STATUS] Error:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}