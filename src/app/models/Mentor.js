import mongoose from 'mongoose';

// Define the schema for Social Links
const SocialsSchema = new mongoose.Schema({
    linkedin: { type: String, required: false },
    github: { type: String, required: false },
    twitter: { type: String, required: false },
}, { _id: false });

// Define the schema for Availability
// NOTE: For a real app, you would integrate a service like Calendly, 
// and store only the booking link, or use complex time slot logic.
const AvailabilitySchema = new mongoose.Schema({
    calendlyLink: { 
        type: String, 
        required: false, 
        default: 'https://calendly.com/mentos-booking' 
    },
    // Simple structure to show general weekly availability (e.g., Mon-Fri, 9am-5pm)
    summary: { type: String, default: 'Available Mon - Fri (9 AM - 5 PM)' }
}, { _id: false });


const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this mentor.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  role: {
    type: String,
    required: true,
  },
  sessions: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  // --- New Fields ---
  skills: {
      type: [String], // Array of strings (e.g., ['React', 'NodeJS', 'UX Design'])
      default: [],
  },
  languages: {
      type: [String], // Array of strings (e.g., ['English', 'Spanish'])
      default: [],
  },
  socials: {
      type: SocialsSchema,
      default: {}
  },
  availability: {
      type: AvailabilitySchema,
      default: {}
  }
}, { timestamps: true });

export default mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema);