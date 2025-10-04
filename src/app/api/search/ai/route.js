import { NextResponse } from 'next/server';
import { getAllExploreMentors } from '../../../lib/mentorService'; 
import { findMentorsByAI } from '../../../lib/gemini';

export async function POST(request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json({ message: 'Query is required' }, { status: 400 });
    }

    // 1. Fetch all mentor data from DB/Service
    // We need the full list to provide context to Gemini
    const allMentors = await getAllExploreMentors();

    // 2. Run the AI matchmaking
    const matchedIds = await findMentorsByAI(query, allMentors);

    // 3. Return the list of matched IDs
    return NextResponse.json({ matchedIds }, { status: 200 });

  } catch (error) {
    console.error('AI Search route failed:', error);
    return NextResponse.json(
      { message: 'Failed to process AI search' },
      { status: 500 }
    );
  }
}