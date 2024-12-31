import React from 'react';
import { render, renderHook, act } from '@testing-library/react';
import { TimeSchedulerProvider, useTimeScheduler } from '../TimeSchedulerContext';
import { mockScheduleData } from '../mockData';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TimeSchedulerProvider initialScheduleData={mockScheduleData}>
    {children}
  </TimeSchedulerProvider>
);

describe('TimeSchedulerContext', () => {
  it('should throw error when used outside provider', () => {
    expect(() => {
      const { result } = renderHook(() => useTimeScheduler());
    }).toThrow('useTimeScheduler must be used within a TimeSchedulerProvider');
  });

  it('should initialize with provided schedule data', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    expect(result.current.scheduleData).toEqual(mockScheduleData);
  });

  it('should handle date selection', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    
    act(() => {
      result.current.setSelectedDate('2024-03-18');
    });

    expect(result.current.selectedDate).toBe('2024-03-18');
    expect(result.current.availableTimeSlots.length).toBeGreaterThan(0);
  });

  it('should handle time slot selection', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    
    const timeSlot = {
      startTime: '10:00',
      endTime: '10:30',
      isBooked: false,
    };

    act(() => {
      result.current.setSelectedTimeSlot(timeSlot);
    });

    expect(result.current.selectedTimeSlot).toEqual(timeSlot);
  });

  it('should add a booking correctly', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    
    act(() => {
      result.current.addBooking('2024-03-18', '11:00', '11:30');
    });

    const updatedSchedule = result.current.scheduleData.find(
      schedule => schedule.date === '2024-03-18'
    );
    
    expect(updatedSchedule?.bookings).toContainEqual({
      start: '11:00',
      end: '11:30',
    });
  });

  it('should remove a booking correctly', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    
    // First add a booking
    act(() => {
      result.current.addBooking('2024-03-18', '11:00', '11:30');
    });

    // Then remove it
    act(() => {
      result.current.removeBooking('2024-03-18', '11:00', '11:30');
    });

    const updatedSchedule = result.current.scheduleData.find(
      schedule => schedule.date === '2024-03-18'
    );
    
    expect(updatedSchedule?.bookings).not.toContainEqual({
      start: '11:00',
      end: '11:30',
    });
  });

  it('should generate available time slots for selected date', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    
    act(() => {
      result.current.setSelectedDate('2024-03-18');
    });

    const slots = result.current.availableTimeSlots;
    
    // Check if slots are generated
    expect(slots.length).toBeGreaterThan(0);
    
    // Check if existing bookings are marked as booked
    const bookedSlot = slots.find(
      slot => slot.startTime === '14:00' && slot.endTime === '14:30'
    );
    expect(bookedSlot?.isBooked).toBe(true);
  });

  it('should handle non-existent date selection', () => {
    const { result } = renderHook(() => useTimeScheduler(), { wrapper });
    
    act(() => {
      result.current.setSelectedDate('2024-03-25'); // Date not in mock data
    });

    // Should still generate slots with default operating hours
    expect(result.current.availableTimeSlots.length).toBeGreaterThan(0);
    expect(result.current.availableTimeSlots[0]).toEqual({
      startTime: '09:00',
      endTime: '09:30',
      isBooked: false,
    });
  });
}); 