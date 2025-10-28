'use client';

import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * SearchFilters Component
 * Provides advanced filtering options for mentor search
 * Includes filters for skills, experience level, availability, and more
 */
export default function SearchFilters({ onFiltersChange, initialFilters = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    experienceLevel: initialFilters.experienceLevel || 'all',
    availability: initialFilters.availability || 'all',
    languages: initialFilters.languages || [],
    skills: initialFilters.skills || [],
    minSessions: initialFilters.minSessions || 0,
    topRatedOnly: initialFilters.topRatedOnly || false,
    ...initialFilters
  });

  // Available filter options
  const experienceLevels = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'junior', label: 'Junior (0-3 years)' },
    { value: 'mid', label: 'Mid-level (3-7 years)' },
    { value: 'senior', label: 'Senior (7+ years)' },
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Any Availability' },
    { value: 'asap', label: 'Available ASAP' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
  ];

  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'AI', 'Machine Learning',
    'Product Mgmt', 'Design', 'Leadership', 'Communication'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Portuguese'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleArrayFilterToggle = (key, value) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      experienceLevel: 'all',
      availability: 'all',
      languages: [],
      skills: [],
      minSessions: 0,
      topRatedOnly: false,
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.experienceLevel !== 'all' ||
      filters.availability !== 'all' ||
      filters.languages.length > 0 ||
      filters.skills.length > 0 ||
      filters.minSessions > 0 ||
      filters.topRatedOnly
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      {/* Filter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Advanced Filters</span>
          {hasActiveFilters() && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 space-y-6">
          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Skills Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleArrayFilterToggle('skills', skill)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    filters.skills.includes(skill)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Languages Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleArrayFilterToggle('languages', language)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    filters.languages.includes(language)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Sessions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Sessions: {filters.minSessions}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minSessions}
              onChange={(e) => handleFilterChange('minSessions', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>100+</span>
            </div>
          </div>

          {/* Top Rated Only */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="topRatedOnly"
              checked={filters.topRatedOnly}
              onChange={(e) => handleFilterChange('topRatedOnly', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="topRatedOnly" className="ml-2 text-sm text-gray-700">
              Show only top-rated mentors
            </label>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
