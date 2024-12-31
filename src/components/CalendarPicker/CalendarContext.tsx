import { createContext } from 'react';
import { CalendarContextType } from './types';

export const CalendarContext = createContext<CalendarContextType>({
  startDate: null,
  endDate: null,
  currentMonth: new Date(),
  availableDates: [],
  minDate: undefined,
  maxDate: undefined,
  onSelect: (date: Date) => { /* noop */ },
  setCurrentMonth: (date: Date) => { /* noop */ }
}); 

