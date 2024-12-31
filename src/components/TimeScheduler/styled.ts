import styled from '@emotion/styled';
import { Paper, Button } from '@mui/material';

export const SchedulerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledPaper = styled(Paper)`
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  margin: 0 auto;
`;

export const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 16px;
`;

export const TimeSlotButton = styled(Button)<{
  isBooked?: boolean;
  isSelected?: boolean;
}>`
  && {
    padding: 6px;
    width: 100%;
    background-color: ${({ isBooked, isSelected }) =>
      isBooked
        ? '#424242'
        : isSelected
        ? '#00C853'
        : 'transparent'};
    color: ${({ isBooked }) =>
      isBooked ? '#666666' : '#fff'};
    border: 1px solid ${({ isBooked, isSelected }) =>
      isBooked
        ? '#424242'
        : isSelected
        ? '#00C853'
        : '#666666'};

    &:hover {
      background-color: ${({ isBooked, isSelected }) =>
        isBooked
          ? '#424242'
          : isSelected
          ? '#00E676'
          : '#404144'};
    }

    &:disabled {
      background-color: #424242;
      color: #666666;
      border-color: #424242;
    }
  }
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2B2C2E;
  border-radius: 8px;
  width: 300px;
  color: #fff;
`;

export const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #404144;
`;

export const ModalActions = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #404144;

  button {
    width: 100%;
    padding: 10px;
  }
`; 