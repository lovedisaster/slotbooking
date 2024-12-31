import { createContext } from 'react';

export interface CalendarContextType {
  currentMonth: Date;
  onSelect: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  currentMonth: new Date(),
  onSelect: (date: Date) => { /* noop */ },
  setCurrentMonth: (date: Date) => { /* noop */ }
});