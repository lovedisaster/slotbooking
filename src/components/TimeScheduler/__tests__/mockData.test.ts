import { generateAvailableTimeSlots, DaySchedule, OPERATING_HOURS } from '../mockData';

describe('generateAvailableTimeSlots', () => {
  it('should generate correct time slots for a normal working day', () => {
    const schedule: DaySchedule = {
      date: '2024-03-18',
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [],
      bookings: [],
    };

    const slots = generateAvailableTimeSlots(schedule);
    
    // For 9:00 to 17:00 with 30-minute intervals, we should have 16 slots
    expect(slots).toHaveLength(16);
    
    // Check first slot
    expect(slots[0]).toEqual({
      startTime: '09:00',
      endTime: '09:30',
      isBooked: false,
    });

    // Check last slot
    expect(slots[slots.length - 1]).toEqual({
      startTime: '16:30',
      endTime: '17:00',
      isBooked: false,
    });
  });

  it('should mark slots as booked when they overlap with unavailable ranges', () => {
    const schedule: DaySchedule = {
      date: '2024-03-18',
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [
        { start: '12:00', end: '13:00' }, // Lunch break
      ],
      bookings: [],
    };

    const slots = generateAvailableTimeSlots(schedule);
    
    // Check slots during lunch break are marked as booked
    const lunchSlots = slots.filter(
      slot => slot.startTime >= '12:00' && slot.endTime <= '13:00'
    );
    
    expect(lunchSlots.every(slot => slot.isBooked)).toBe(true);
    expect(lunchSlots).toHaveLength(2); // Two 30-minute slots during lunch
  });

  it('should mark slots as booked when they overlap with bookings', () => {
    const schedule: DaySchedule = {
      date: '2024-03-18',
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [],
      bookings: [
        { start: '14:00', end: '15:00' }, // 1-hour booking
      ],
    };

    const slots = generateAvailableTimeSlots(schedule);
    
    // Check booked slots
    const bookedSlots = slots.filter(
      slot => slot.startTime >= '14:00' && slot.endTime <= '15:00'
    );
    
    expect(bookedSlots.every(slot => slot.isBooked)).toBe(true);
    expect(bookedSlots).toHaveLength(2); // Two 30-minute slots
  });

  it('should handle custom operating hours', () => {
    const schedule: DaySchedule = {
      date: '2024-03-20',
      operatingHours: {
        start: '09:00',
        end: '15:00', // Short day
      },
      unavailableRanges: [],
      bookings: [],
    };

    const slots = generateAvailableTimeSlots(schedule);
    
    // For 9:00 to 15:00 with 30-minute intervals, we should have 12 slots
    expect(slots).toHaveLength(12);
    
    // Check last slot of shortened day
    expect(slots[slots.length - 1]).toEqual({
      startTime: '14:30',
      endTime: '15:00',
      isBooked: false,
    });
  });

  it('should handle overlapping unavailable ranges and bookings', () => {
    const schedule: DaySchedule = {
      date: '2024-03-18',
      operatingHours: OPERATING_HOURS,
      unavailableRanges: [
        { start: '12:00', end: '13:00' }, // Lunch break
      ],
      bookings: [
        { start: '12:30', end: '13:30' }, // Overlaps with lunch
      ],
    };

    const slots = generateAvailableTimeSlots(schedule);
    
    // Check all affected slots are marked as booked
    const affectedSlots = slots.filter(
      slot => slot.startTime >= '12:00' && slot.endTime <= '13:30'
    );
    
    expect(affectedSlots.every(slot => slot.isBooked)).toBe(true);
    expect(affectedSlots).toHaveLength(3); // Three 30-minute slots
  });
}); 