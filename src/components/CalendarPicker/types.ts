export interface ThemeType {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    text: string;
    disabled: string;
    weekend: string;
    hover: string;
    background: string;
    headerBackground: string;
    selectedBackground: string;
    hoveredBackground: string;
  };
  borderRadius: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
  };
  typography: {
    fontFamily: string;
    header: {
      fontSize: string;
      fontWeight: string;
      letterSpacing: string;
    };
    calendar: {
      fontSize: string;
      fontWeight: string;
      weekday: {
        fontSize: string;
        fontWeight: string;
        letterSpacing: string;
      };
    };
  };
}

export interface CalendarContextType {
  startDate: Date | null;
  endDate: Date | null;
  currentMonth: Date;
  availableDates: Date[];
  minDate?: Date;
  maxDate?: Date;
  onSelect: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
}

export interface CalendarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (startDate: Date, endDate: Date) => void;
  theme?: ThemeType;
  availableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
} 