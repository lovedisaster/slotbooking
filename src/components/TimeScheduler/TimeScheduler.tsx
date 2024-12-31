import React, { useState } from 'react';
import { Modal, Typography, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, isAfter, startOfToday } from 'date-fns';
import { useTimeScheduler } from './TimeSchedulerContext';
import { ThemeProvider } from '@mui/material/styles';
import { schedulerTheme } from './themes';
import {
  SchedulerContainer,
  StyledPaper,
  TimeSlotGrid,
  TimeSlotButton,
  ModalContent,
  ModalHeader,
  ModalActions,
} from './styled';

interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export const TimeScheduler: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    availableTimeSlots,
    addBooking,
  } = useTimeScheduler();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setSelectedDate(formattedDate);
      setIsModalOpen(true);
      setSelectedSlots([]);
    }
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlots(prev => {
      const isSelected = prev.some(
        s => s.startTime === slot.startTime && s.endTime === slot.endTime
      );
      if (isSelected) {
        return prev.filter(
          s => s.startTime !== slot.startTime || s.endTime !== slot.endTime
        );
      } else {
        return [...prev, slot];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedDate && selectedSlots.length > 0) {
      selectedSlots.forEach(slot => {
        addBooking(selectedDate, slot.startTime, slot.endTime);
      });
      setIsModalOpen(false);
      setSelectedSlots([]);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSlots([]);
  };

  const shouldDisableDate = (date: Date) => {
    return !isAfter(date, startOfToday());
  };

  const isSlotSelected = (slot: TimeSlot) => {
    return selectedSlots.some(
      s => s.startTime === slot.startTime && s.endTime === slot.endTime
    );
  };

  return (
    <ThemeProvider theme={schedulerTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SchedulerContainer>
          <StyledPaper>
            <DateCalendar
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={handleDateChange}
              shouldDisableDate={shouldDisableDate}
            />
          </StyledPaper>

          <Modal open={isModalOpen} onClose={handleCancel}>
            <ModalContent>
              <ModalHeader>
                <Typography variant="h6">
                  Select Time Slots for {selectedDate}
                </Typography>
              </ModalHeader>

              <TimeSlotGrid>
                {availableTimeSlots.map((slot) => (
                  <TimeSlotButton
                    key={`${slot.startTime}-${slot.endTime}`}
                    onClick={() => handleTimeSlotSelect(slot)}
                    isBooked={slot.isBooked}
                    isSelected={isSlotSelected(slot)}
                    disabled={slot.isBooked}
                    variant={isSlotSelected(slot) ? 'contained' : 'outlined'}
                  >
                    {slot.startTime} - {slot.endTime}
                  </TimeSlotButton>
                ))}
              </TimeSlotGrid>

              <ModalActions>
                <Button
                  onClick={handleConfirm}
                  color="primary"
                  variant="contained"
                  disabled={selectedSlots.length === 0}
                >
                  {selectedSlots.length === 1 ? 'Confirm Booking' : `Confirm Bookings (${selectedSlots.length})`}
                </Button>
                <Button onClick={handleCancel} color="inherit">
                  Cancel
                </Button>
              </ModalActions>
            </ModalContent>
          </Modal>
        </SchedulerContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}; 