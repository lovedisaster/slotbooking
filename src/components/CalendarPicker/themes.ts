import { ThemeType } from './types';

export const defaultTheme: ThemeType = {
  colors: {
    primary: '#2ECC71',
    primaryLight: '#4CD787',
    primaryDark: '#27AE60',
    secondary: '#27AE60',
    text: '#2C3E50',
    disabled: '#BDC3C7',
    weekend: '#95A5A6',
    hover: '#4CD787',
    background: '#FFFFFF',
    headerBackground: '#2ECC71',
    selectedBackground: '#2ECC71',
    hoveredBackground: '#E8F5E9',
  },
  borderRadius: '4px',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    header: {
      fontSize: '16px',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    calendar: {
      fontSize: '14px',
      fontWeight: '500',
      weekday: {
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }
    }
  }
};

export const darkTheme: ThemeType = {
  colors: {
    primary: '#2ECC71',
    primaryLight: '#4CD787',
    primaryDark: '#27AE60',
    secondary: '#27AE60',
    text: '#FFFFFF',
    disabled: '#636E72',
    weekend: '#A0A0A0',
    hover: '#4CD787',
    background: '#2D3436',
    headerBackground: '#2ECC71',
    selectedBackground: '#2ECC71',
    hoveredBackground: '#1E272E',
  },
  borderRadius: '8px',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    header: {
      fontSize: '16px',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    calendar: {
      fontSize: '14px',
      fontWeight: '500',
      weekday: {
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }
    }
  }
}; 