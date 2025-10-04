"use client";
// import { SignedIn } from "@clerk/nextjs";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Users, GraduationCap, MessageSquare, Star } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div
      className="min-h-screen overflow-hidden "
      style={{ backgroundImage: "url('/Landing_Page.jpg')" }}
    >
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

        <SignedOut>
          <SignInButton>
            <Button className="cursor-pointer bg-transparent hover:bg-transparent">
                <button className="bg-indigo-600 cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
                  Join as Mentor
                </button>
                
                <button className="bg-purple-500 cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition">
                  Join as Mentee
                </button>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-20 h-20",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>

        {/* <div className="flex justify-center gap-6">
            <button className="bg-indigo-600 cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
              Join as Mentor
            </button>
            <button className="bg-purple-500 cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition">
              Join as Mentee
            </button>
          </div> */}
      </div>
    </div>
  );
}
