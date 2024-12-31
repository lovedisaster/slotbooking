import { Theme } from './theme';

export const defaultTheme: Theme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    calendar: {
      fontSize: '14px',
      fontWeight: '400',
      weekday: {
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }
    },
    header: {
      fontSize: '16px',
      fontWeight: '500',
      letterSpacing: '0.1px',
    },
  },
  colors: {
    text: '#FFFFFF',
    primary: '#00C853',
    primaryLight: '#00E676',
    primaryDark: '#00B248',
    secondary: '#757575',
    hover: '#00E676',
    disabled: '#666666',
    weekend: '#BBBBBB',
    background: '#424242',
    headerBackground: '#00C853',
    selectedBackground: '#00C853',
    hoveredBackground: '#00E676'
  },
  borderRadius: '4px',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
}; 