# @yuefengzhang/slotbooking

A modern React time slot booking component library with calendar picker and scheduler. Built with Material-UI and Emotion.

## Features

- 📅 Modern calendar picker with dark theme support
- ⏰ Flexible time slot selection
- 🎨 Fully customizable themes
- 📱 Responsive design
- 🔄 Built-in availability management
- 💪 TypeScript support

## Installation

First, install the package:
```bash
npm install @yuefengzhang/slotbooking
```

This library uses Material-UI and other dependencies. If you don't have them in your project yet, install the required peer dependencies:

```bash
npm install @mui/material @mui/x-date-pickers @mui/icons-material @mui/system @emotion/react @emotion/styled date-fns
```

If you already have some of these dependencies in your project, you don't need to install them again. The library is compatible with the following versions:

```json
{
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@mui/material": "^5.0.0",
  "@mui/x-date-pickers": "^6.0.0",
  "@mui/icons-material": "^5.0.0",
  "@mui/system": "^5.0.0",
  "date-fns": "^2.30.0"
}
```

Note: The library requires `react` and `react-dom` version 18 or higher.

## Usage

### TimeScheduler

```tsx
import { TimeScheduler, TimeSchedulerProvider } from '@yuefengzhang/slotbooking';

const scheduleData = [
  {
    date: '2024-03-18',
    operatingHours: {
      start: '09:00',
      end: '17:00'
    },
    unavailableRanges: [
      { start: '12:00', end: '13:00' } // Lunch break
    ],
    bookings: [
      { start: '14:00', end: '15:00' } // Existing booking
    ]
  }
];

function App() {
  return (
    <TimeSchedulerProvider initialScheduleData={scheduleData}>
      <TimeScheduler />
    </TimeSchedulerProvider>
  );
}
```

### CalendarPicker

```tsx
import { CalendarPicker, darkTheme } from '@yuefengzhang/slotbooking';

function App() {
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

### TimeSchedulerProvider Props

| Prop | Type | Description |
|------|------|-------------|
| initialScheduleData | DaySchedule[] | Schedule configuration with available slots and bookings |
| children | ReactNode | Child components |

### CalendarPicker Props

| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Controls calendar visibility |
| onClose | () => void | Called when calendar is closed |
| onSelect | (date: Date) => void | Called when date is selected |
| theme | Theme | Theme configuration |
| availableDates | Date[] | Array of available dates |
| minDate | Date | Minimum selectable date |
| maxDate | Date | Maximum selectable date |

## Customization

### Theme Structure

```tsx
const theme = {
  colors: {
    primary: '#00C853',
    primaryLight: '#4CD787',
    primaryDark: '#27AE60',
    secondary: '#757575',
    text: '#FFFFFF',
    disabled: '#666666',
    weekend: '#BBBBBB',
    background: '#424242',
    headerBackground: '#00C853',
    selectedBackground: '#00C853',
    hoveredBackground: '#00E676'
  },
  borderRadius: '4px',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px'
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    calendar: {
      fontSize: '14px',
      fontWeight: '400'
    }
  }
};
```

## License

MIT © Yuefeng Zhang 