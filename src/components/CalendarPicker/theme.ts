export interface Theme {
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
      fontWeight: string | number;
      letterSpacing: string;
    };
    calendar: {
      fontSize: string;
      fontWeight: string | number;
      weekday: {
        fontSize: string;
        fontWeight: string | number;
        letterSpacing: string;
      };
    };
  };
}

declare module '@emotion/react' {
  export interface Theme {
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
        fontWeight: string | number;
        letterSpacing: string;
      };
      calendar: {
        fontSize: string;
        fontWeight: string | number;
        weekday: {
          fontSize: string;
          fontWeight: string | number;
          letterSpacing: string;
        };
      };
    };
  }
} 