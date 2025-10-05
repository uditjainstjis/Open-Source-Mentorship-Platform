"use client";
import { Users, GraduationCap, MessageSquare, Star } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen overflow-hidden " style={{backgroundImage: "url('/Landing_Page.jpg')"}}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Mentorship Matching App
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-indigo-600 mb-6">
          Connecting open-source mentors and students
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          Find the right mentor or mentee to grow in open-source. Build
          meaningful connections, share knowledge, and learn together.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex justify-center gap-6">
          <button className="bg-indigo-600 cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
            Join as Mentor
          </button>
          <button className="bg-purple-500 cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition">
            Join as Mentee
          </button>
        </div>
      </div>

      {/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-8 pb-20">
        <div className="rounded-2xl overflow-hidden shadow-lg h-72">
          <img
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt="Mentor"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg h-96">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTAUPUG0r--EDZzf-f9Afj_Jp7N96yIGsWPgCYIkrAS1rCJHIcdm_RCq_me44bJc0dvvY&usqp=CAU"
            alt="Mentor"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg h-72 relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu39T921WqVS7A0YWJqq3MMviO-djiwgg83dPTGyjVaIrAhZBeZqhejr_TbuQ36KMSuUo&usqp=CAU" // yaha apna custom screenshot/video call image rakhna
            alt="Mentorship Call"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg h-80">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb7XQQufEZkyW8BrQh5h9CnsuQRy_4nqy64U2AtlGiMmo91_VhbyMGknVzvCIqjo3ybU&usqp=CAU" // yaha dusra custom image
            alt="Group Mentorship"
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}
    </div>
  );
}
