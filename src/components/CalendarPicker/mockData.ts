import { addMonths, isWithinInterval, startOfToday } from 'date-fns';

// Dates that are NOT available (Christmas period)
const UNAVAILABLE_DATES = {
  start: new Date(2024, 11, 25), // December 25, 2024
  end: new Date(2024, 11, 29),   // December 29, 2024
};

export const isDateAvailable = (date: Date): boolean => {
  return !isWithinInterval(date, {
    start: UNAVAILABLE_DATES.start,
    end: UNAVAILABLE_DATES.end,
  });
};

// Initial mock data for testing
export const mockData = {
  availableDates: [], // Empty means all dates are available except the ones checked in isDateAvailable
  minDate: startOfToday(),  // Today
  maxDate: addMonths(startOfToday(), 6), // 6 months from today
}; 