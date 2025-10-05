'use client' 
import React, { useState, useEffect } from 'react';
import { 
    SignedIn, 
    SignedOut, 
    useAuth, // Used for session and token access
    SignInButton 
} from "@clerk/nextjs";
import { Loader2 } from 'lucide-react';

// Imports for Dashboard
import DashboardLayout from "./components/DashboardLayout"; 

// Imports for Landing/Form UI
import ProfileSetupForm from './components/ProfileSetupForm';
import { Button } from "./components/ui/button"; // Assuming Button is imported here


// --- Helper Components ---
const FullScreenLoader = ({ message }) => (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-teal-600 mr-2" size={32} />
        <p>{message}</p>
    </div>
);


export default function Home() {
    // Get essential auth states and the token function
    const { isLoaded, isSignedIn, getToken } = useAuth(); 
    
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [isLoadingStatus, setIsLoadingStatus] = useState(false); 

    // --- EFFECT: Check User Status (Manual Token Fetch) ---
    useEffect(() => {
        // Only run this logic if Clerk is fully loaded and the user is signed in
        if (isLoaded && isSignedIn) {
            setIsLoadingStatus(true);
            
            async function checkSetup() {
                // Fetch the JWT session token explicitly
                const token = await getToken(); 

                try {
                    const response = await fetch('/api/user/status', {
                        method: 'GET',
                        headers: {
                            // Manually attach the Bearer token for authorization
                            'Authorization': `Bearer ${token}`, 
                        },
                    });
                    
                    if (response.status === 200) {
                        const data = await response.json();
                        setIsSetupComplete(data.isSetupComplete);
                    } else {
                         // This handles 401, 404, or 500 errors from the API
                         console.error(`API Check failed with status ${response.status}.`);
                         // If we fail to check, assume incomplete setup or throw error
                         setIsSetupComplete(false); 
                    }
                } catch (error) {
                    console.error("Network or Setup check failed:", error);
                    setIsSetupComplete(false);
                } finally {
                    setIsLoadingStatus(false);
                }
            }

            checkSetup();
        }
    }, [isLoaded, isSignedIn, getToken]); // Depend on Clerk status and getToken readiness
    
    // --- Initial Loading State (Before Clerk is ready) ---
    if (!isLoaded) {
        return <FullScreenLoader message="Initializing authentication..." />;
    }

    // --- Render Logic ---
    return (
        <>
            <SignedOut>
                {/* 1. Landing Page UI for Signed Out Users */}
                <div 
                    className="min-h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: "url('/Landing_Page.jpg')" }}
                >
                    <div className="text-center p-10 bg-white/80 rounded-xl shadow-lg">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Mentorship Matching</h1>
                        <p className="text-gray-700 mb-6">Connect with open-source mentors and students to grow together.</p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <SignInButton><Button className="bg-indigo-600 ...">Join as Mentor</Button></SignInButton>
                            <SignInButton><Button className="bg-purple-500 ...">Join as Mentee</Button></SignInButton>
                        </div>
                    </div>
                </div>
            </SignedOut>

            <SignedIn>
                {/* 2. Enforced Blocking for Signed In Users */}
                {isLoadingStatus ? (
                    <FullScreenLoader message="Checking profile status..." />
                ) : !isSetupComplete ? (
                    // 3. Show Form if setup is incomplete
                    <ProfileSetupForm onSetupComplete={setIsSetupComplete} />
                ) : (
                    // 4. Show Dashboard if setup is complete
                    <DashboardLayout />
                )}
            </SignedIn>
        </>
    );
}