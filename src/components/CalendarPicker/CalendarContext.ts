import { createContext } from 'react';

interface CalendarContextType {
  startDate: Date | null;
  endDate: Date | null;
  currentMonth: Date;
  availableDates: Date[];
  minDate?: Date;
  maxDate?: Date;
  onSelect: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  startDate: null,
  endDate: null,
  currentMonth: new Date(),
  availableDates: [],
  onSelect: () => {},
  minDate: undefined,
  maxDate: undefined,
  setCurrentMonth: () => {},
});