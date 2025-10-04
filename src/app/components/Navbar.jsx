'use client';
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-teal-800">MentOS</h1>

        {/* Search Bar */}
        <div className="flex items-center w-1/2 border border-gray-300 rounded-lg px-3 py-2">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search your doubts"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Profile / Auth Section */}
        <div className="flex items-center justify-center">
          {/* If signed out, show sign-in button */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 text-gray-500"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fillRule="evenodd"
                    d="M14 14s-1-1.5-6-1.5S2 14 2 14s1-4 6-4 6 4 6 4z"
                  />
                </svg>
              </button>
            </SignInButton>
          </SignedOut>

          {/* If signed in, show Clerk user button (menu has Sign out option) */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </div>

      {/* Thin Blue Top Border */}
      <div className="h-[3px] bg-blue-500 w-full" />
    </nav>
  );
}
