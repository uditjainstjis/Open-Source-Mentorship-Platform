import { NextResponse } from 'next/server';
import { getDashboardMentors } from '../../../lib/mentorService'; 

export async function GET() {
  const mentors = await getDashboardMentors();
  return NextResponse.json(mentors, { status: 200 });
}