import styled from '@emotion/styled';
import { Theme } from './theme';

export const CalendarContainer = styled.div<{ theme: Theme }>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.calendar.fontSize};
  font-weight: ${({ theme }) => theme.typography.calendar.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const DayButton = styled.button<{
  isSelected?: boolean;
  isDisabled?: boolean;
  isWeekend?: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  theme: Theme;
}>`
  background: ${({ isSelected, isInRange, theme }) =>
    isSelected
      ? theme.colors.primary
      : isInRange
      ? theme.colors.primaryLight
      : 'transparent'};
  color: ${({ isDisabled, isSelected, isWeekend, isInRange, theme }) =>
    isDisabled
      ? theme.colors.disabled
      : isSelected || isInRange
      ? '#fff'
      : isWeekend
      ? theme.colors.weekend
      : theme.colors.text};
  border-radius: ${({ theme, isRangeStart, isRangeEnd, isSelected, isInRange }) =>
    isSelected || isRangeStart || isRangeEnd
      ? theme.borderRadius
      : isInRange
      ? '0'
      : theme.borderRadius};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSize.medium};
  padding: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.calendar.fontSize};
  font-weight: ${({ theme }) => theme.typography.calendar.fontWeight};
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primaryDark : theme.colors.hover};
  }

  ${({ isInRange, theme }) => isInRange && `
    &:hover {
      background: ${theme.colors.primaryLight};
    }
  `}

  ${props => props.isDisabled && !props.isWeekend && `
    color: ${props.theme.colors.disabled};
    background: transparent;
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
  `}
`; 