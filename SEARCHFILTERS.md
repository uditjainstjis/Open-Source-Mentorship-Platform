# SearchFilters Component

## Overview
The `SearchFilters` component provides advanced filtering capabilities for the mentor search functionality. It allows users to filter mentors based on multiple criteria including experience level, availability, skills, languages, and more.

## Features
- **Experience Level Filtering**: Filter by junior, mid-level, or senior mentors
- **Availability Filtering**: Find mentors available ASAP, this week, or this month
- **Skills Filtering**: Multi-select skill tags for precise matching
- **Language Filtering**: Filter by mentor language proficiency
- **Session Count**: Minimum session slider to find experienced mentors
- **Top-Rated Filter**: Show only top-rated mentors
- **Clear Filters**: One-click reset of all active filters
- **Collapsible UI**: Expandable panel to save screen space

## Usage

### Basic Implementation

```jsx
import SearchFilters from './components/SearchFilters';

function ExplorePage() {
  const handleFiltersChange = (newFilters) => {
    console.log('Active filters:', newFilters);
    // Apply filters to your mentor list
  };

  return (
    <div>
      <SearchFilters onFiltersChange={handleFiltersChange} />
      {/* Your mentor grid */}
    </div>
  );
}
```

### With Initial Filters

```jsx
<SearchFilters 
  onFiltersChange={handleFiltersChange}
  initialFilters={{
    experienceLevel: 'senior',
    skills: ['React', 'Node.js'],
    topRatedOnly: true
  }}
/>
```

## Filter Structure

The `onFiltersChange` callback receives an object with the following structure:

```javascript
{
  experienceLevel: 'all' | 'junior' | 'mid' | 'senior',
  availability: 'all' | 'asap' | 'this-week' | 'this-month',
  languages: string[],  // Array of selected languages
  skills: string[],     // Array of selected skills
  minSessions: number,  // 0-100
  topRatedOnly: boolean
}
```

## Integration Example

```jsx
const [filters, setFilters] = useState({});

const filteredMentors = useMemo(() => {
  let result = allMentors;
  
  // Apply experience level filter
  if (filters.experienceLevel !== 'all') {
    result = result.filter(m => m.experienceLevel === filters.experienceLevel);
  }
  
  // Apply skills filter
  if (filters.skills?.length > 0) {
    result = result.filter(m => 
      filters.skills.some(skill => m.skills.includes(skill))
    );
  }
  
  // Apply minimum sessions filter
  if (filters.minSessions > 0) {
    result = result.filter(m => m.sessions >= filters.minSessions);
  }
  
  // Apply top-rated filter
  if (filters.topRatedOnly) {
    result = result.filter(m => m.isTopRated);
  }
  
  return result;
}, [allMentors, filters]);
```

## Customization

You can customize the available options by modifying the arrays in the component:

- `experienceLevels`: Modify experience level categories
- `availabilityOptions`: Add custom availability timeframes
- `popularSkills`: Update the list of filterable skills
- `languages`: Modify supported languages

## Styling

The component uses Tailwind CSS classes. You can customize the appearance by modifying the className strings in the component file.

## Accessibility

- All interactive elements are keyboard accessible
- Proper ARIA labels for screen readers
- Visual indicators for active filters
- Clear visual feedback for selected options
