"use client"
import { useRouter } from "next/navigation";
import React from 'react';
import { Heart, MessageSquare, MoreHorizontal, Rocket, CheckCircle, Lightbulb, Shield, Briefcase, ChevronRight, Calendar } from 'lucide-react';

const InsightIcon = ({ icon, className }) => {
    switch (icon) {
        case 'Top50': return <img src="https://api.iconify.design/cib/hackhands.svg?color=blue" alt="Badge" className="w-8 h-8"/>;
        case 'Star': return <Lightbulb size={24} className="text-blue-500" />;
        case 'Shield': return <Shield size={24} className="text-green-500" />;
        default: return <CheckCircle size={24} className="text-gray-500" />;
    }
};

const TabButton = ({ label, count, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
    >
        {label} {count && <span className="text-xs ml-1 bg-gray-200 px-2 py-0.5 rounded-full">{count}</span>}
    </button>
);

const Chip = ({ label, icon: Icon }) => (
    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
        {Icon && <Icon size={14} />}
        {label}
    </span>
);




export default function MentorProfileContent({ mentor }) {
    const router = useRouter()
    const handleClick = () =>{
        router.push('/chat')
    }
    if (!mentor) return null;
    
    // We only focus on the static display for the 'Overview' tab here.
    const currentTab = 'Overview'; 

    return (
        <div className="bg-gray-50 min-h-full">
            
            {/* 1. Header and Hero */}
            <div className="bg-white pb-10 shadow-sm relative">
                {/* Banner Placeholder (Green background from image) */}
                <div className="h-48 bg-teal-800 relative">
                    <img src="/banner.png" alt="Banner" className="w-full h-full object-cover opacity-30" />
                </div>

                {/* Profile Card and Actions */}
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex justify-between items-end -mt-16">
                        {/* Profile Info */}
                        <div>
                            <img 
                                src={mentor.image} 
                                alt={mentor.name} 
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            <h1 className="text-3xl font-bold mt-4">{mentor.name} {mentor.flag}</h1>
                            <p className="text-lg text-gray-600">
                                {mentor.jobTitle} at {mentor.company}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{mentor.coFounderDetails}</p>
                            
                            {/* Social Links */}
                            <div className="flex gap-3 mt-2">
                                {mentor.socials.linkedin && (<a href={mentor.socials.linkedin} target="_blank"><Briefcase size={18} className="text-gray-500 hover:text-blue-600" /></a>)}
                                {mentor.socials.twitter && (<a href={mentor.socials.twitter} target="_blank"><Briefcase size={18} className="text-gray-500 hover:text-blue-600" /></a>)}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button className="p-3 border rounded-full hover:bg-gray-50" onClick={handleClick}><MessageSquare size={20} className="text-gray-600" /></button>
                            <button className="p-3 border rounded-full hover:bg-gray-50"><Heart size={20} className="text-gray-600" /></button>
                            <button className="p-3 border rounded-full hover:bg-gray-50"><MoreHorizontal size={20} className="text-gray-600" /></button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8 flex gap-4 border-b border-gray-200">
                        <TabButton label="Overview" active={currentTab === 'Overview'} />
                        <TabButton label="Reviews" count={mentor.reviewsCount} active={currentTab === 'Reviews'} />
                        <TabButton label="Achievements" count={mentor.achievementsCount} active={currentTab === 'Achievements'} />
                        <TabButton label="Group Sessions" active={currentTab === 'Group Sessions'} />
                    </div>
                </div>
            </div>

            {/* 2. Main Content Body */}
            <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8">
                
                {/* LEFT COLUMN (Profile Details) */}
                <div className="w-2/3 space-y-8">
                    
                    {/* Profile Insights */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Profile insights</h2>
                        <div className="flex justify-end text-sm text-blue-600">
                            How do I get these?
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {mentor.profileInsights.map((insight, i) => (
                                <div key={i} className={`p-4 ${i === 0 ? 'col-span-2' : 'border border-gray-100 rounded-lg'}`}>
                                    <div className="flex items-start gap-3">
                                        <InsightIcon icon={insight.icon} />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                                            {insight.period && <p className="text-sm text-gray-500">{insight.period}</p>}
                                            {insight.desc && <p className="text-xs text-gray-500 mt-1">{insight.desc}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Background */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Background</h2>
                        
                        <div className="space-y-4">
                            <label className="text-sm text-gray-500 block">Expertise</label>
                            <div className="flex gap-2">
                                {mentor.backgroundExpertise.map((exp, i) => <Chip key={i} label={exp} />)}
                            </div>
                            
                            <label className="text-sm text-gray-500 block">Disciplines</label>
                            <div className="flex gap-2">
                                {mentor.disciplines.map((d, i) => <Chip key={i} label={d} />)}
                            </div>

                            <label className="text-sm text-gray-500 block">Industries</label>
                            <div className="flex gap-2">
                                {mentor.industries.map((ind, i) => <Chip key={i} label={ind} icon={Briefcase} />)}
                            </div>

                            <label className="text-sm text-gray-500 block">Fluent in</label>
                            <div className="flex gap-2">
                                {mentor.languages.map((lang, i) => <Chip key={i} label={lang} />)}
                            </div>
                        </div>

                        {/* Experience History */}
                        <div className="mt-8 pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Experience ({mentor.experienceHistory.length})</h3>
                                <button className="text-sm text-blue-600 hover:underline">View all</button>
                            </div>
                            {mentor.experienceHistory.map((exp, i) => (
                                <div key={i} className="flex items-start gap-4 p-2">
                                    <Briefcase size={20} className="text-gray-400 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">{exp.title}</h4>
                                        <p className="text-sm text-gray-600">{exp.company}</p>
                                    </div>
                                    <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{exp.period}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (Stats & Sessions) */}
                <div className="w-1/3 space-y-6">
                    
                    {/* Community Statistics */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Community statistics</h3>
                            <button className="text-sm text-blue-600 hover:underline flex items-center">
                                See more <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="flex justify-between text-center">
                            <div className="flex flex-col items-center">
                                <Rocket size={24} className="text-blue-500 mb-1" />
                                <span className="font-bold">{mentor.totalMentoringTime}</span>
                                <span className="text-xs text-gray-500">Total mentoring time</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle size={24} className="text-red-500 mb-1" />
                                <span className="font-bold">{mentor.sessionsCompleted}</span>
                                <span className="text-xs text-gray-500">Sessions completed</span>
                            </div>
                        </div>
                    </div>

                    {/* Available Sessions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Available sessions</h3>
                        <p className="text-sm text-gray-600 mb-4">Book 1:1 sessions based on your needs</p>
                        
                        {/* Daily Slots Selector */}
                        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
                            <CalendarDay date="MON 06 Oct" slots={55} active />
                            <CalendarDay date="TUE 07 Oct" slots={55} />
                            <CalendarDay date="WED 08 Oct" slots={55} />
                            <CalendarDay date="THU 09 Oct" slots={55} />
                            <button className="flex items-center text-sm text-blue-600 ml-4 flex-shrink-0">
                                View all <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Available Time Slots */}
                        <h4 className="font-semibold text-sm text-gray-700 mt-6 mb-3">Available time slots</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {['8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM'].map((time, i) => (
                                <button key={i} className="p-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition">
                                    {time}
                                </button>
                            ))}
                        </div>

                        {/* Book Button */}
                        <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                            Book Session for 06 Oct 2025
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Helper component for the calendar days
const CalendarDay = ({ date, slots, active }) => (
    <div className={`p-3 text-center rounded-lg border flex-shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
        <p className="text-xs font-medium">{date.split(' ')[0]}</p>
        <p className="font-bold text-lg">{date.split(' ')[1]}</p>
        <p className={`text-xs ${active ? 'text-blue-200' : 'text-green-600'}`}>{slots} slots</p>
    </div>
);