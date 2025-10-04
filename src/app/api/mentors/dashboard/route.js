import { NextResponse } from 'next/server';
// Assuming this service function fetches data safely from MongoDB
import { getDashboardMentors } from '../../../lib/mentorService'; 

// Handles GET requests to /api/mentors/dashboard
export async function GET() {
  try {
    const mentors = await getDashboardMentors();
    
    // Return the data as JSON
    // MONGODB_URI is safely accessed within the scope of this file/function
    return NextResponse.json(mentors, { status: 200 });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}