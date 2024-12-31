import '@testing-library/jest-dom';

// Mock Material UI icons
jest.mock('@mui/icons-material/KeyboardArrowLeft', () => () => 'LeftArrow');
jest.mock('@mui/icons-material/KeyboardArrowRight', () => () => 'RightArrow');

// Mock date
jest.useFakeTimers().setSystemTime(new Date('2024-01-15')); 