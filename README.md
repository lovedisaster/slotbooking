# slotbooking.js

A modern React time slot booking component with a beautiful dark theme calendar picker.

## Features

- 📅 Beautiful dark theme calendar
- ⏰ Time slot selection with customizable intervals
- 🎨 Material-UI based styling
- 🌙 Dark mode by default
- 📱 Responsive design
- 🔒 Disabled dates support
- 🎯 TypeScript support

## Installation

```bash
npm install slotbooking.js
```

or

```bash
yarn add slotbooking.js
```

## Dependencies

This package requires the following peer dependencies:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@mui/material": "^5.0.0",
  "@mui/x-date-pickers": "^6.0.0",
  "date-fns": "^2.30.0"
}
```

## Usage

```tsx
import { TimeScheduler, TimeSchedulerProvider } from 'slotbooking.js';

// Example schedule data
const scheduleData = [
  {
    date: '2024-03-18',
    operatingHours: { start: '09:00', end: '17:00' },
    unavailableRanges: [
      { start: '12:00', end: '13:00' }, // Lunch break
    ],
    bookings: [
      { start: '14:00', end: '15:00' }, // Existing booking
    ],
  },
  // ... more days
];

function App() {
  return (
    <TimeSchedulerProvider initialScheduleData={scheduleData}>
      <TimeScheduler />
    </TimeSchedulerProvider>
  );
}
```

## API

### TimeSchedulerProvider Props

| Prop | Type | Description |
|------|------|-------------|
| initialScheduleData | DaySchedule[] | Array of schedule data for each day |
| children | React.ReactNode | Child components |

### DaySchedule Interface

```typescript
interface DaySchedule {
  date: string;                    // Format: 'YYYY-MM-DD'
  operatingHours: {
    start: string;                 // Format: 'HH:mm'
    end: string;                   // Format: 'HH:mm'
  };
  unavailableRanges: TimeRange[];  // Blocked time ranges
  bookings: TimeRange[];           // Existing bookings
}

interface TimeRange {
  start: string;                   // Format: 'HH:mm'
  end: string;                     // Format: 'HH:mm'
}
```

## License

MIT © [Your Name] 