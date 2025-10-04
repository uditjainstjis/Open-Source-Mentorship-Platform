'use client'
// // page.js
import Sidebar from "./components/Sidebar";
import { Button } from "./components/ui/button";

import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (<>
  
  
  <SignedOut>
        <div       className="min-h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/Landing_Page.jpg')" }}>
        <div className="text-center p-10 bg-white/80 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Mentorship Matching
          </h1>
          <p className="text-gray-700 mb-6">
            Connect with open-source mentors and students to grow together.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <SignInButton>
              <Button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
                Join as Mentor
              </Button>
            </SignInButton>
            <SignInButton>
              <Button className="bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition">
                Join as Mentee
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
      </SignedOut>

      <SignedIn>
    
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar is fixed */}
      <Sidebar pathname="/" /> 
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {/* MainContent now pulls suggested data */}
          <MainContent />
        </main>
      </div>
    </div>
    </SignedIn>

    </>
  );
}

// import Hero from "./components/Hero";
// import Navbar from "./components/Navbar0";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//     <Navbar/>
//     <Hero/>
//     </>
    
//   );
// }
