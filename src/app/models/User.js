import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: false },
    suggestedMentorIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Mentor",
      default: [],
    },

    // --- UPDATED/NEW FIELDS ---
    // User’s technical proficiency level (Beginner/Intermediate/Advanced)
    techLevel: {
        type: String,
        default: "Beginner" 
    },
    // Array of user's skills (up to 5)
    skills: {
      type: [String],
      default: [],
    },
    // Subjective text field for goals/expectations
    goalDescription: { 
      type: String,
      default: "",
    },
    // Resume link (replacing upload)
    resumeLink: { 
      type: String,
      default: "",
    },
    // LinkedIn profile link (NEW)
    linkedin: {
      type: String,
      default: "",
    },
    // GitHub profile link
    github: {
      type: String,
      default: "",
    },
    // Optional user name (collected in Step 1)
    name: {
      type: String,
      default: "",
    },
    // Role field repurposed for current job title or student status
    role: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);