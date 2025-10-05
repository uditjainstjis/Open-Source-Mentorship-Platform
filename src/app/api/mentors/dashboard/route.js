import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server'; // Use getAuth
import { getDashboardMentors } from '../../../lib/mentorService'; 

// --- DEVELOPMENT SIMULATION CONSTANTS ---
const IS_DEV = process.env.NODE_ENV === 'development';
const DEV_USER_ID = 'user_dev_simulated_id_12345'; 
// ----------------------------------------

export async function GET(request) { // <-- Must accept request object
  const { userId: clerkUserId } = getAuth(request); // <-- Read token from request
  let finalUserId = clerkUserId;

  // 1. DEVELOPMENT BYPASS CHECK
  // if (!finalUserId && IS_DEV) {
  //   finalUserId = DEV_USER_ID; 
  // }
  
  if (!finalUserId) {
    // If auth fails, return 401
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch data using the identified User ID
  try {
    const mentors = await getDashboardMentors(finalUserId); 
    
    return NextResponse.json(mentors, { status: 200 });

  } catch (error) {
    console.error('Dashboard API Error fetching personalized data:', error);
    return NextResponse.json(
      { message: 'Internal Server Error fetching data.' },
      { status: 500 }
    );
  }
}