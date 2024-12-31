// Types for our data structure
export interface TimeSlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }
  
  export interface DaySchedule {
    date: string;
    operatingHours: {
      start: string;
      end: string;
    };
    unavailableRanges: TimeRange[];
    bookings: TimeRange[];
  }
  
  export interface TimeRange {
    start: string;
    end: string;
  }
  
  // Constants
  export const TIME_SLOT_DURATION = 30; // in minutes
  export const OPERATING_HOURS = {
    start: '09:00',
    end: '17:00',
  };
  
  // Mock data for a week
  export const mockScheduleData: DaySchedule[] = [
    {
      date: '2024-03-18', // Monday
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [
        // Lunch break
        { start: '12:00', end: '13:00' },
        // Team meeting
        { start: '09:00', end: '10:00' },
      ],
      bookings: [
        { start: '14:00', end: '15:00' }, // Existing appointment
      ],
    },
    {
      date: '2024-03-19', // Tuesday
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [
        // Lunch break
        { start: '12:00', end: '13:00' },
      ],
      bookings: [
        { start: '10:30', end: '11:30' },
        { start: '15:00', end: '16:00' },
      ],
    },
    {
      date: '2024-03-20', // Wednesday
      operatingHours: {
        start: '09:00',
        end: '15:00', // Short day
      },
      unavailableRanges: [
        { start: '12:00', end: '13:00' },
      ],
      bookings: [],
    },
    {
      date: '2024-03-21', // Thursday
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [
        { start: '12:00', end: '13:00' },
        // Staff training
        { start: '15:00', end: '17:00' },
      ],
      bookings: [
        { start: '09:30', end: '10:30' },
      ],
    },
    {
      date: '2024-03-22', // Friday
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [
        { start: '12:00', end: '13:00' },
      ],
      bookings: [
        { start: '13:30', end: '14:30' },
      ],
    },
  ];
  
  // Helper function to generate available time slots for a given day
  export const generateAvailableTimeSlots = (schedule: DaySchedule): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const { operatingHours, unavailableRanges, bookings } = schedule;
    
    let currentTime = new Date(`2024-01-01 ${operatingHours.start}`);
    const endTime = new Date(`2024-01-01 ${operatingHours.end}`);
  
    while (currentTime < endTime) {
      const startTimeStr = currentTime.toTimeString().slice(0, 5);
      currentTime.setMinutes(currentTime.getMinutes() + TIME_SLOT_DURATION);
      const endTimeStr = currentTime.toTimeString().slice(0, 5);
  
      const allRanges = unavailableRanges.concat(bookings);
      const isBooked = allRanges.some(range => {
        return startTimeStr >= range.start && endTimeStr <= range.end;
      });
  
      slots.push({
        startTime: startTimeStr,
        endTime: endTimeStr,
        isBooked,
      });
    }
  
    return slots;
  };