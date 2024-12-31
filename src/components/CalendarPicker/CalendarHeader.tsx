import React, { useState } from 'react';
import styled from '@emotion/styled';
import { format, addMonths, subMonths } from 'date-fns';
import { Theme } from './theme';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { MonthYearPicker } from './MonthYearPicker';

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  position: relative;
`;

const MonthYearText = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.header.fontSize};
  font-weight: ${({ theme }) => theme.typography.header.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.header.letterSpacing};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 18px;
  }
`;

interface CalendarHeaderProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onMonthChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <HeaderContainer>
      <NavigationButton onClick={() => onMonthChange(subMonths(currentDate, 1))}>
        <ArrowBackIosNewIcon />
      </NavigationButton>
      <MonthYearText onClick={() => setShowPicker(!showPicker)}>
        {format(currentDate, 'MMMM yyyy')}
      </MonthYearText>
      <NavigationButton onClick={() => onMonthChange(addMonths(currentDate, 1))}>
        <ArrowForwardIosIcon />
      </NavigationButton>
      {showPicker && (
        <MonthYearPicker
          currentDate={currentDate}
          onSelect={onMonthChange}
          onClose={() => setShowPicker(false)}
        />
      )}
    </HeaderContainer>
  );
}; 