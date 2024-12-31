# SlotBooking.js

A modern React time slot booking component library with a calendar picker and scheduler. Built with Material-UI and Emotion for a sleek, customizable UI.

## Features

- 📅 Modern calendar picker with dark theme
- ⏰ Time slot selection with multiple slot support
- 🎨 Customizable themes and styles
- 📱 Responsive design
- 🔄 Built-in availability management
- 💪 TypeScript support
- 🎯 Zero-dependency core (only peer dependencies)

## Installation

```bash
# npm
npm install slotbooking.js @mui/material @mui/x-date-pickers @emotion/react @emotion/styled date-fns

# yarn
yarn add slotbooking.js @mui/material @mui/x-date-pickers @emotion/react @emotion/styled date-fns
```

## Quick Start

```tsx
import { TimeScheduler, TimeSchedulerProvider } from 'slotbooking.js';

function App() {
  return (
    <TimeSchedulerProvider initialScheduleData={scheduleData}>
      <TimeScheduler />
    </TimeSchedulerProvider>
  );
}
```

## Components

### TimeScheduler

A complete scheduling solution with calendar and time slot selection.

```tsx
import { TimeScheduler, TimeSchedulerProvider } from 'slotbooking.js';

// Example schedule data
const scheduleData = {
  availableTimeSlots: [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    // ...
  ],
  bookings: [
    { date: '2024-01-01', startTime: '09:00', endTime: '10:00' },
    // ...
  ]
};

function SchedulerExample() {
  return (
    <TimeSchedulerProvider initialScheduleData={scheduleData}>
      <TimeScheduler />
    </TimeSchedulerProvider>
  );
}
```

### CalendarPicker

A standalone calendar component with customizable theme.

```tsx
import { CalendarPicker, darkTheme } from 'slotbooking.js';

function CalendarExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <CalendarPicker
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSelect={setSelectedDate}
      theme={darkTheme}
      availableDates={availableDates}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
```

## API Reference

### TimeScheduler Props

| Prop | Type | Description |
|------|------|-------------|
| No direct props | - | All configuration is handled through the TimeSchedulerProvider |

### TimeSchedulerProvider Props

| Prop | Type | Description |
|------|------|-------------|
| initialScheduleData | ScheduleData | Initial schedule configuration including available slots and bookings |
| children | ReactNode | Child components |

### CalendarPicker Props

| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Controls the visibility of the calendar |
| onClose | () => void | Callback when the calendar is closed |
| onSelect | (date: Date) => void | Callback when a date is selected |
| theme | Theme | Theme configuration object |
| availableDates | Date[] | Array of available dates |
| minDate | Date | Minimum selectable date |
| maxDate | Date | Maximum selectable date |

## Customization

### Theming

The library comes with a built-in dark theme, but you can customize it:

```tsx
const customTheme = {
  colors: {
    primary: '#00C853',
    secondary: '#757575',
    text: '#FFFFFF',
    // ... other color options
  },
  // ... other theme options
};

<CalendarPicker theme={customTheme} />
```

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test

# Build library
yarn build
```

## License

MIT © Yuefeng Zhang 