import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isWeekend,
  isSameMonth
} from 'date-fns';
import { CalendarHeader } from './CalendarHeader';

const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 16px;
`;

const WeekdayHeader = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.calendar.fontSize};
  font-weight: ${({ theme }) => theme.typography.calendar.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 8px;
`;

const DayCell = styled.button<{
  isDisabled?: boolean;
  isWeekend?: boolean;
  isSelected?: boolean;
}>`
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : 'transparent'};
  color: ${({ isDisabled, isWeekend, isSelected, theme }) =>
    isDisabled
      ? theme.colors.disabled
      : isSelected
      ? '#fff'
      : isWeekend
      ? theme.colors.weekend
      : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.calendar.fontSize};
  font-weight: ${({ theme }) => theme.typography.calendar.fontWeight};
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primaryDark : theme.colors.hover};
  }
`;

interface CalendarProps {
  baseDate?: Date;
  onDateSelect: (date: Date) => void;
  availableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  baseDate = new Date(),
  onDateSelect,
  availableDates = [],
  minDate,
  maxDate,
}) => {
  const [currentDate, setCurrentDate] = useState(baseDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const isDateDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;
    if (availableDates.length > 0) {
      return !availableDates.some(availableDate => isSameDay(date, availableDate));
    }
    return false;
  };

  return (
    <CalendarContainer>
      <CalendarHeader
        currentDate={currentDate}
        onMonthChange={setCurrentDate}
      />
      <CalendarGrid>
        {weekDays.map(day => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}
        {days.map(date => (
          <DayCell
            key={date.toString()}
            onClick={() => !isDateDisabled(date) && onDateSelect(date)}
            isDisabled={isDateDisabled(date) || !isSameMonth(date, currentDate)}
            isWeekend={isWeekend(date)}
            isSelected={isSameDay(date, baseDate)}
            disabled={isDateDisabled(date) || !isSameMonth(date, currentDate)}
            style={{
              visibility: isSameMonth(date, currentDate) ? 'visible' : 'hidden'
            }}
          >
            {format(date, 'd')}
          </DayCell>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
}; 