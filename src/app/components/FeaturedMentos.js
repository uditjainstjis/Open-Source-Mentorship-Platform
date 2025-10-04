// Assuming getMentors is now implemented in lib/mentorService.js
// using the Mentor model and dbConnect utility.

import { getMentors } from "../lib/mentorService"; // Adjust import path

export default async function FeaturedMentors() {
    // Note: If FeaturedMentors is in the root and lib is outside, adjust the import path:
    // import { getMentors } from "../lib/mentorService"; 
    
    const mentors = await getMentors(); 
    // Ensure the data structure matches what this component expects (name, expertise, _id)
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Featured Mentors</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {mentors.map((m) => (
            <div key={m._id} className="p-4 bg-white shadow rounded">
              <h3 className="font-semibold">{m.name}</h3>
              {/* Assuming 'role' from the DB serves as 'expertise' here */}
              <p className="text-sm text-gray-500">{m.role}</p> 
            </div>
          ))}
        </div>
      </div>
    );
  }