'use client';

import React from 'react';
import { Clock, Calendar, Zap } from 'lucide-react';

/**
 * AvailabilityBadge Component
 * Displays mentor availability status with appropriate styling and icons
 * 
 * @param {Object} props
 * @param {string} props.status - Availability status: 'available', 'busy', 'limited', 'offline'
 * @param {string} props.nextAvailable - Next available time slot (optional)
 * @param {string} props.size - Badge size: 'sm', 'md', 'lg'
 * @param {boolean} props.showIcon - Whether to show icon
 * @param {boolean} props.showNextAvailable - Whether to show next available time
 */
export default function AvailabilityBadge({ 
  status = 'offline', 
  nextAvailable = null,
  size = 'md',
  showIcon = true,
  showNextAvailable = false
}) {
  // Configuration for each status
  const statusConfig = {
    available: {
      label: 'Available Now',
      icon: Zap,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
      iconColor: 'text-green-600',
      pulseColor: 'bg-green-500'
    },
    busy: {
      label: 'Currently Busy',
      icon: Clock,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-300',
      iconColor: 'text-red-600',
      pulseColor: null
    },
    limited: {
      label: 'Limited Availability',
      icon: Calendar,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-300',
      iconColor: 'text-yellow-600',
      pulseColor: null
    },
    offline: {
      label: 'Offline',
      icon: Clock,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      borderColor: 'border-gray-300',
      iconColor: 'text-gray-500',
      pulseColor: null
    }
  };

  const config = statusConfig[status] || statusConfig.offline;
  const Icon = config.icon;

  // Size configurations
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 12,
      pulse: 'h-1.5 w-1.5'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 14,
      pulse: 'h-2 w-2'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 16,
      pulse: 'h-2.5 w-2.5'
    }
  };

  const sizes = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="inline-block">
      <div
        className={`
          ${config.bgColor} 
          ${config.textColor} 
          ${config.borderColor}
          ${sizes.container}
          border rounded-full font-medium
          flex items-center gap-1.5
          transition-all duration-200
        `}
      >
        {/* Pulse indicator for available status */}
        {config.pulseColor && (
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full ${sizes.pulse} ${config.pulseColor}`}></span>
          </span>
        )}
        
        {/* Icon */}
        {showIcon && (
          <Icon size={sizes.icon} className={config.iconColor} />
        )}
        
        {/* Label */}
        <span>{config.label}</span>
      </div>

      {/* Next Available Time */}
      {showNextAvailable && nextAvailable && status !== 'available' && (
        <div className="mt-1 text-xs text-gray-600">
          Next: {nextAvailable}
        </div>
      )}
    </div>
  );
}

/**
 * Utility function to determine mentor availability status
 * @param {Object} mentor - Mentor object with availability data
 * @returns {string} - Status: 'available', 'busy', 'limited', or 'offline'
 */
export function getMentorAvailabilityStatus(mentor) {
  if (!mentor.availability) return 'offline';
  
  const { isAvailableASAP, nextAvailableSlot, currentlyBooked } = mentor.availability;
  
  if (isAvailableASAP && !currentlyBooked) {
    return 'available';
  }
  
  if (currentlyBooked) {
    return 'busy';
  }
  
  if (nextAvailableSlot) {
    const nextDate = new Date(nextAvailableSlot);
    const now = new Date();
    const daysUntilAvailable = Math.ceil((nextDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntilAvailable <= 3) {
      return 'limited';
    }
  }
  
  return 'offline';
}

/**
 * Format next available time in a human-readable format
 * @param {string|Date} dateString - Next available date
 * @returns {string} - Formatted string like "Today 3:00 PM" or "Tomorrow" or "Mon, Jan 15"
 */
export function formatNextAvailable(dateString) {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return `Today ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  if (diffDays === 1) {
    return `Tomorrow ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  if (diffDays <= 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
