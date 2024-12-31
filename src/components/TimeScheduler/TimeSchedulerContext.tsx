import React, { createContext, useContext, useState, useCallback } from 'react';
import { DaySchedule, TimeSlot, generateAvailableTimeSlots } from './mockData';

interface TimeSchedulerContextType {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  scheduleData: DaySchedule[];
  setScheduleData: (data: DaySchedule[]) => void;
  selectedTimeSlot: TimeSlot | null;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  availableTimeSlots: TimeSlot[];
  addBooking: (date: string, startTime: string, endTime: string) => void;
  removeBooking: (date: string, startTime: string, endTime: string) => void;
}

const TimeSchedulerContext = createContext<TimeSchedulerContextType | undefined>(undefined);

export const useTimeScheduler = () => {
  const context = useContext(TimeSchedulerContext);
  if (!context) {
    throw new Error('useTimeScheduler must be used within a TimeSchedulerProvider');
  }
  return context;
};

interface TimeSchedulerProviderProps {
  children: React.ReactNode;
  initialScheduleData: DaySchedule[];
}

export const TimeSchedulerProvider: React.FC<TimeSchedulerProviderProps> = ({ 
  children, 
  initialScheduleData 
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>(initialScheduleData);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const availableTimeSlots = selectedDate
    ? generateAvailableTimeSlots(
        scheduleData.find(schedule => schedule.date === selectedDate) || {
          date: selectedDate,
          operatingHours: { start: '09:00', end: '17:00' },
          unavailableRanges: [],
          bookings: [],
        }
      )
    : [];

  const addBooking = useCallback((date: string, startTime: string, endTime: string) => {
    setScheduleData(prevData => {
      return prevData.map(schedule => {
        if (schedule.date === date) {
          return {
            ...schedule,
            bookings: [...schedule.bookings, { start: startTime, end: endTime }],
          };
        }
        return schedule;
      });
    });
  }, []);

  const removeBooking = useCallback((date: string, startTime: string, endTime: string) => {
    setScheduleData(prevData => {
      return prevData.map(schedule => {
        if (schedule.date === date) {
          return {
            ...schedule,
            bookings: schedule.bookings.filter(
              booking => !(booking.start === startTime && booking.end === endTime)
            ),
          };
        }
        return schedule;
      });
    });
  }, []);

  const value = {
    selectedDate,
    setSelectedDate,
    scheduleData,
    setScheduleData,
    selectedTimeSlot,
    setSelectedTimeSlot,
    availableTimeSlots,
    addBooking,
    removeBooking,
  };

  return (
    <TimeSchedulerContext.Provider value={value}>
      {children}
    </TimeSchedulerContext.Provider>
  );
};

export default TimeSchedulerContext; 