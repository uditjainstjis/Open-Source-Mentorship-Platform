// src/app/components/FallbackData.js

export const FALLBACK_MENTOR = {
    _id: "fb_001",
    name: "Nick J. (Offline)",
    role: "Fallback Mentor",
    company: "AsyncAPI",
    sessions: 5,
    reviews: 1,
    image: "https://via.placeholder.com/300x200?text=Fallback",
    experience: "5 years",
    attendance: "99%",
    isTopRated: false,
    isAvailableASAP: false,
    flag: "🌐",
    skills: ["Fallback Skill", "General Guidance"],
    languages: ["English"],
    socials: {},
    availability: {},
  };
  
  export const FALLBACK_MENTOR_LIST = [
    FALLBACK_MENTOR,
    {...FALLBACK_MENTOR, _id: "fb_002", name: "Grace H.", role: "Tech Writer at Red Hat"},
    {...FALLBACK_MENTOR, _id: "fb_003", name: "David Kim", role: "Cloud Architect"},
    {...FALLBACK_MENTOR, _id: "fb_004", name: "Priya Sharma", role: "CI/CD Consultant"},
    {...FALLBACK_MENTOR, _id: "fb_005", name: "Victor Rossi", role: "Eng Ops Head"},
  ];
  
  export const FALLBACK_IMAGE_URL = "https://via.placeholder.com/300x200?text=Placeholder+Image";