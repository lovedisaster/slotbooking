import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Theme } from './theme';
import { Calendar } from './Calendar';
import { defaultTheme } from './defaultTheme';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 20px;
  min-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface CalendarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  theme?: Theme;
  availableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  theme = defaultTheme,
  availableDates,
  minDate,
  maxDate,
}) => {
  if (!isOpen) return null;

  return (
    <ThemeProvider theme={theme}>
      <Overlay onClick={onClose}>
        <StyledModal onClick={e => e.stopPropagation()}>
          <Calendar
            baseDate={new Date()}
            onDateSelect={onSelect}
            availableDates={availableDates}
            minDate={minDate}
            maxDate={maxDate}
          />
        </StyledModal>
      </Overlay>
    </ThemeProvider>
  );
};

export default CalendarPicker; 