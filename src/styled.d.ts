import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material/styles';

// Extend the MUI theme type with custom properties
export interface Theme extends MuiTheme {
  calendar: {
    fontSize: string;
    fontWeight: string | number;
  };
}

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    calendar: {
      fontSize: string;
      fontWeight: string | number;
    };
  }
} 