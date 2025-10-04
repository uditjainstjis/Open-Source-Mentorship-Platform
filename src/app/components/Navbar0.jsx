"use client";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">MentOS</div>


      {/* 036368 */}
    </nav>
  );
};

export default Navbar;
