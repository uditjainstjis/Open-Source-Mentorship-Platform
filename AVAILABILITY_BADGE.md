# AvailabilityBadge Component

## Overview
The `AvailabilityBadge` component displays a mentor's current availability status with visual indicators, icons, and optional next available time information.

## Features
- **4 Status Types**: Available Now, Currently Busy, Limited Availability, Offline
- **Pulse Animation**: Green pulse indicator for "Available Now" status
- **Customizable Sizes**: Small, medium, and large badge sizes
- **Icon Support**: Optional icons for each status type
- **Next Available Time**: Display when mentor will next be available
- **Color-coded**: Intuitive color scheme (green=available, red=busy, yellow=limited, gray=offline)
- **Utility Functions**: Helper functions to determine status and format dates

## Installation

The component is located at `src/app/components/AvailabilityBadge.jsx`

## Basic Usage

```jsx
import AvailabilityBadge from './components/AvailabilityBadge';

// Simple usage
<AvailabilityBadge status="available" />
<AvailabilityBadge status="busy" />
<AvailabilityBadge status="limited" />
<AvailabilityBadge status="offline" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | string | `'offline'` | Availability status: `'available'`, `'busy'`, `'limited'`, or `'offline'` |
| `nextAvailable` | string | `null` | Next available time slot (formatted string) |
| `size` | string | `'md'` | Badge size: `'sm'`, `'md'`, or `'lg'` |
| `showIcon` | boolean | `true` | Whether to display the status icon |
| `showNextAvailable` | boolean | `false` | Whether to display next available time below badge |

## Advanced Examples

### With Next Available Time

```jsx
<AvailabilityBadge 
  status="busy" 
  nextAvailable="Tomorrow 3:00 PM"
  showNextAvailable={true}
/>
```

### Different Sizes

```jsx
<AvailabilityBadge status="available" size="sm" />
<AvailabilityBadge status="available" size="md" />
<AvailabilityBadge status="available" size="lg" />
```

### Without Icon

```jsx
<AvailabilityBadge status="limited" showIcon={false} />
```

## Utility Functions

### getMentorAvailabilityStatus

Automatically determines the availability status from mentor data:

```jsx
import { getMentorAvailabilityStatus } from './components/AvailabilityBadge';

const mentor = {
  availability: {
    isAvailableASAP: true,
    currentlyBooked: false,
    nextAvailableSlot: null
  }
};

const status = getMentorAvailabilityStatus(mentor);
// Returns: 'available'
```

### formatNextAvailable

Formats a date string into a human-readable format:

```jsx
import { formatNextAvailable } from './components/AvailabilityBadge';

const nextSlot = formatNextAvailable('2025-10-29T15:00:00');
// Returns: "Tomorrow 3:00 PM"
```

## Integration with MentorCard

```jsx
import AvailabilityBadge, { 
  getMentorAvailabilityStatus, 
  formatNextAvailable 
} from './components/AvailabilityBadge';

function MentorCard({ mentor }) {
  const availabilityStatus = getMentorAvailabilityStatus(mentor);
  const nextSlot = formatNextAvailable(mentor.availability?.nextAvailableSlot);

  return (
    <div className="mentor-card">
      <h3>{mentor.name}</h3>
      
      <AvailabilityBadge 
        status={availabilityStatus}
        nextAvailable={nextSlot}
        showNextAvailable={true}
        size="md"
      />
      
      {/* Rest of card content */}
    </div>
  );
}
```

## Status Determination Logic

The `getMentorAvailabilityStatus` function uses the following logic:

1. **Available**: `isAvailableASAP === true` AND `currentlyBooked === false`
2. **Busy**: `currentlyBooked === true`
3. **Limited**: Next available slot is within 3 days
4. **Offline**: No availability data or next slot is more than 3 days away

## Styling

The component uses Tailwind CSS with the following color schemes:

- **Available** (Green): `bg-green-100`, `text-green-800`, `border-green-300`
- **Busy** (Red): `bg-red-100`, `text-red-800`, `border-red-300`
- **Limited** (Yellow): `bg-yellow-100`, `text-yellow-800`, `border-yellow-300`
- **Offline** (Gray): `bg-gray-100`, `text-gray-600`, `border-gray-300`

## Accessibility

- Color-coded with text labels for clarity
- Icons supplement color coding
- Proper semantic HTML structure
- Screen reader friendly

## Example Data Structure

```javascript
const mentorWithAvailability = {
  name: "Jane Doe",
  role: "Senior Engineer",
  availability: {
    isAvailableASAP: false,
    currentlyBooked: true,
    nextAvailableSlot: "2025-10-30T14:00:00Z"
  }
};
```

## Animation

The "Available Now" status includes a subtle pulse animation to draw attention:
- Outer pulse ring with fade animation
- Inner solid dot
- Smooth transitions for visual appeal
