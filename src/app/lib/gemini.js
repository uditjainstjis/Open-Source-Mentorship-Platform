import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// This function queries Gemini to match a query to a list of mentor IDs
export async function findMentorsByAI(query, mentors) {
    if (!mentors || mentors.length === 0) return [];

    // Create a simplified text representation of the mentor data
    const mentorContext = mentors.map(m => 
        `ID: ${m._id}, Name: ${m.name}, Role: ${m.role}, Skills: ${m.skills.join(', ')}`
    ).join('\n');

    const prompt = `
        You are an expert matchmaking system. Your task is to identify the IDs of the mentors
        from the provided list who best match the user's specific request.
        
        Mentor List:
        ---
        ${mentorContext}
        ---
        
        User Request: "${query}"
        
        Analyze the request and the mentor list. Return ONLY a single JSON array containing 
        the string IDs of the top 3 to 5 matching mentors, or all IDs if the match is perfect. 
        If no mentors match, return an empty array.
        
        Example Output Format: ["id1", "id2", "id3"]
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            }
        });

        // The response.text should be a JSON string array of IDs
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Gemini API Error:", error);
        return [];
    }
}