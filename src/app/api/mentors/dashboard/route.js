import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; // Import auth to get the userId
import { getDashboardMentors } from '../../../lib/mentorService'; 

// --- DEVELOPMENT SIMULATION CONSTANTS ---
const IS_DEV = process.env.NODE_ENV === 'development';
const DEV_USER_ID = 'user_dev_simulated_id_12345'; 
// ----------------------------------------

export async function GET() {
  const { userId: clerkUserId } = auth(); // Get the actual Clerk ID
  let finalUserId = clerkUserId;

  // 1. DEVELOPMENT BYPASS CHECK
  // if (!finalUserId && IS_DEV) {
  //   finalUserId = DEV_USER_ID; 
  // }
  
  if (!finalUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch data using the identified User ID
  try {
    // Use the finalUserId when calling the service function
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