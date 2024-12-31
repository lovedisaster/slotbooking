import React, { useState } from 'react';
import styled from '@emotion/styled';
import { format, setMonth, setYear } from 'date-fns';
import { Theme } from './theme';

const Container = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button<{ isSelected?: boolean }>`
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : 'transparent'};
  color: ${({ isSelected, theme }) =>
    isSelected ? '#fff' : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.calendar.fontSize};
  font-weight: ${({ theme }) => theme.typography.calendar.fontWeight};

  &:hover {
    background: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.hover};
  }
`;

interface MonthYearPickerProps {
  currentDate: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  currentDate,
  onSelect,
  onClose,
}) => {
  const [view, setView] = useState<'month' | 'year'>('month');
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i);
    return format(date, 'MMM');
  });

  const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

  const handleMonthSelect = (monthIndex: number) => {
    onSelect(setMonth(currentDate, monthIndex));
    onClose();
  };

  const handleYearSelect = (year: number) => {
    onSelect(setYear(currentDate, year));
    setView('month');
  };

  return (
    <Container>
      <Button onClick={() => setView(view === 'month' ? 'year' : 'month')}>
        {view === 'month' ? 'Select Month' : 'Select Year'}
      </Button>
      <Grid>
        {view === 'month'
          ? months.map((month, i) => (
              <Button
                key={month}
                isSelected={i === currentMonth}
                onClick={() => handleMonthSelect(i)}
              >
                {month}
              </Button>
            ))
          : years.map(year => (
              <Button
                key={year}
                isSelected={year === currentYear}
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </Button>
            ))}
      </Grid>
    </Container>
  );
}; 