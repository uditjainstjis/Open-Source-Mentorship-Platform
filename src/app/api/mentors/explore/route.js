import { NextResponse } from 'next/server';
import { getAllExploreMentors } from '../../../lib/mentorService'; 

export async function GET() {
  const mentors = await getAllExploreMentors();
  return NextResponse.json(mentors, { status: 200 });
}