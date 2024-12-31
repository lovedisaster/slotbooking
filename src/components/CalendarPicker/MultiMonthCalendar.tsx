import React from 'react';
import styled from '@emotion/styled';
import { Calendar } from './Calendar';
import { addMonths } from 'date-fns';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

interface MultiMonthCalendarProps {
  onSelect: (date: Date) => void;
  availableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export const MultiMonthCalendar: React.FC<MultiMonthCalendarProps> = ({
  onSelect,
  availableDates,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavigationButton onClick={handlePrevMonth}>
          <KeyboardArrowLeftIcon />
        </NavigationButton>
        <NavigationButton onClick={handleNextMonth}>
          <KeyboardArrowRightIcon />
        </NavigationButton>
      </div>
      <CalendarContainer>
        <Calendar
          baseDate={currentMonth}
          onDateSelect={onSelect}
          availableDates={availableDates}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Calendar
          baseDate={addMonths(currentMonth, 1)}
          onDateSelect={onSelect}
          availableDates={availableDates}
          minDate={minDate}
          maxDate={maxDate}
        />
      </CalendarContainer>
    </Container>
  );
}; 