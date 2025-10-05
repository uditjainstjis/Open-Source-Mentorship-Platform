'use client';
import React, { useState } from 'react';
import { GraduationCap, BarChart, UserPlus, Loader2 } from 'lucide-react';

const BUTTON_STYLE = "bg-teal-700 text-white px-6 py-2 rounded font-semibold transition hover:bg-teal-800";
const INPUT_STYLE = "w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500";
const CHIP_STYLE = (active) => `px-4 py-2 text-sm rounded-full border transition cursor-pointer ${
    active ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
}`;
const STEP_BOX_STYLE = (active) => `w-1/4 p-4 text-center ${
    active ? 'border-b-4 border-blue-500 text-blue-800 font-semibold' : 'text-gray-500'
}`;


// --- STEP COMPONENTS ---

const Step1 = ({ data, updateData }) => (
    <div className="space-y-4">
        <input type="text" placeholder="Full name (e.g., Jane Doe)" name="fullName" value={data.fullName || ''} onChange={updateData} className={INPUT_STYLE} required />
        <input type="text" placeholder="Current Role (e.g., Student, SDE at Google)" name="currentRole" value={data.currentRole || ''} onChange={updateData} className={INPUT_STYLE} required />
        <p className="text-xs text-gray-500 mt-2">Mobile, Age, and Gender collection removed for simplicity.</p>
    </div>
);

const Step2 = ({ data, updateData }) => {
    const handleSkillToggle = (skill) => {
        const current = data.topSkills || [];
        const newSkills = current.includes(skill) 
            ? current.filter(s => s !== skill) 
            : [...current, skill].slice(0, 5); // Limit to 5 skills
        updateData({ target: { name: 'topSkills', value: newSkills } });
    };

    const handleTechLevel = (level) => {
        updateData({ target: { name: 'techBackground', value: level } });
    };

    const skillsOptions = [
        "Web Development", "AI", "Machine Learning", "DevOps", "UX Design", 
        "Product Mgmt", "Cybersecurity", "Cloud Computing", "Data Science", "Blockchain"
    ]; // Expanded options

    return (
        <div className="space-y-8">
            <div>
                <h4 className="font-semibold text-lg mb-4">What is your tech proficiency level?</h4>
                <div className="flex justify-around gap-4">
                    {['Beginner', 'Intermediate', 'Advance'].map((level) => (
                        <div key={level} onClick={() => handleTechLevel(level)} 
                             className={`p-4 text-center border-2 rounded-lg cursor-pointer ${data.techBackground === level ? 'border-teal-600 bg-teal-50' : 'border-gray-300'}`}>
                            {/* Icons remain for visual clarity */}
                            {level === 'Beginner' && <GraduationCap size={32} className="mx-auto text-teal-600 mb-1" />}
                            {level === 'Intermediate' && <BarChart size={32} className="mx-auto text-teal-600 mb-1" />}
                            {level === 'Advance' && <UserPlus size={32} className="mx-auto text-teal-600 mb-1" />}
                            <span className="text-sm font-medium">{level}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">What are your top 5 skills? ({data.topSkills?.length || 0}/5)</h4>
                <div className="flex flex-wrap gap-2">
                    {skillsOptions.map(skill => (
                        <span key={skill} onClick={() => handleSkillToggle(skill)}
                              className={CHIP_STYLE(data.topSkills?.includes(skill))}
                        >
                            {data.topSkills?.includes(skill) ? skill : `+ ${skill}`}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Step3 = ({ data, updateData }) => (
    <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Describe your primary goal and expectations from a mentor.</h4>
        <textarea
            placeholder="I am looking for someone to help me transition from frontend React to MERN stack development, focusing on project structure and deployment strategies..." 
            name="subjectiveGoal" 
            value={data.subjectiveGoal || ''} 
            onChange={updateData} 
            rows={5}
            className={INPUT_STYLE} 
            required
        />
    </div>
);

const Step4 = ({ data, updateData }) => (
    <div className="space-y-6">
        <h4 className="font-semibold text-lg">Connect Profiles (Optional for better matching)</h4>
        <input type="url" placeholder="LinkedIn Profile URL" name="linkedinUrl" value={data.linkedinUrl || ''} onChange={updateData} className={INPUT_STYLE} />
        <input type="url" placeholder="GitHub Profile URL" name="githubUrl" value={data.githubUrl || ''} onChange={updateData} className={INPUT_STYLE} />
        <input type="url" placeholder="Resume Link (Google Drive/PDF Link)" name="resumeLink" value={data.resumeLink || ''} onChange={updateData} className={INPUT_STYLE} />
        <p className="text-xs text-gray-500 mt-2">These links are not compulsory but improve AI matching.</p>
    </div>
);


const STEPS = [
    { title: "Basic Info", component: Step1 },
    { title: "Your background and skills", component: Step2 },
    { title: "Goals", component: Step3 },
    { title: "Final Step", component: Step4 },
];

export default function ProfileSetupForm({ onSetupComplete }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ topSkills: [], expectations: [] });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const CurrentStepComponent = STEPS[step].component;
    const totalSteps = STEPS.length;

    const handleDataChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };
    
    // Validation function
    const validateStep = () => {
        if (step === 0 && (!formData.fullName || !formData.currentRole)) {
            return "Please fill in your full name and current role.";
        }
        if (step === 1 && (!formData.techBackground || formData.topSkills.length === 0)) {
            return "Please select your proficiency level and at least one skill.";
        }
        if (step === 2 && (!formData.subjectiveGoal || formData.subjectiveGoal.length < 20)) {
            return "Please describe your goal in detail (minimum 20 characters).";
        }
        return null;
    };

    const handleNext = async () => {
        const validationError = validateStep();
        if (validationError) {
            alert(validationError);
            return;
        }

        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            // Final Step: Submit
            setIsSubmitting(true);
            setError(null);
            
            const payload = {
                step1: formData,
                step2: formData,
                step3: formData,
                step4: formData,
            };

            try {
                const response = await fetch('/api/user/onboarding', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                
                if (!response.ok) {
                    throw new Error('Form submission failed.');
                }
                
                await response.json();
                onSetupComplete(true); // Notify parent component (page.js) to switch to dashboard

            } catch (err) {
                console.error("Submission Error:", err);
                setError("Failed to save profile. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#619391] p-10 flex flex-col items-center">
            {/* Step Header */}
            <div className="w-full max-w-4xl bg-white flex rounded-t-lg overflow-hidden border-b border-gray-200">
                {STEPS.map((s, i) => (
                    <div key={i} className={STEP_BOX_STYLE(i === step)}>
                        <h3 className="text-sm">{i + 1}. {s.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">Step {i + 1} of {totalSteps}</p>
                    </div>
                ))}
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl bg-white p-10 rounded-b-xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">{STEPS[step].title}</h2>
                <p className="text-center text-sm text-gray-500 mb-8">
                    This will help us to connect you with the right mentors.
                </p>

                <CurrentStepComponent data={formData} updateData={handleDataChange} />

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button 
                        onClick={() => setStep(step - 1)} 
                        disabled={step === 0 || isSubmitting}
                        className="px-6 py-2 border border-teal-600 text-teal-600 rounded font-semibold transition bg-teal-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={isSubmitting}
                        className={BUTTON_STYLE + " flex items-center gap-2 disabled:opacity-50"}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Submitting...
                            </>
                        ) : (
                            step < totalSteps - 1 ? 'Next' : 'Finish Setup'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}