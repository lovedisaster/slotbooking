import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const schedulerTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#2B2C2E',
          margin: 0,
          '&:hover': {
            backgroundColor: '#404144',
          },
          '&.Mui-selected': {
            backgroundColor: '#00C853 !important',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#00E676 !important',
            },
            '&:focus': {
              backgroundColor: '#00C853 !important',
            },
          },
          '&.MuiPickersDay-today': {
            border: '1px solid rgba(255, 255, 255, 0.6)',
            backgroundColor: '#2B2C2E',
            '&:not(.Mui-selected)': {
              borderColor: 'rgba(255, 255, 255, 0.6)',
            },
            '&.Mui-selected': {
              backgroundColor: '#00C853 !important',
              borderColor: '#fff',
            },
          },
          '&.Mui-disabled:not(.Mui-selected)': {
            color: '#AAAAAA',
            backgroundColor: '#2B2C2E',
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#00C853',
          margin: 0,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        label: {
          color: '#fff',
          margin: '0 auto',
          fontSize: '1.1rem',
          fontWeight: 500,
        },
        switchViewButton: {
          display: 'none',
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        root: {
          display: 'flex',
          gap: '8px',
          '& .MuiButtonBase-root': {
            color: '#fff',
            padding: '4px',
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        header: {
          paddingTop: '8px',
          '& .MuiDayCalendar-weekDayLabel': {
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '4px 0',
          },
        },
        weekContainer: {
          margin: '2px 0',
          '& .MuiButtonBase-root': {
            color: '#fff',
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          padding: '0 0 8px 0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B2C2E',
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#00C853',
            '&:hover': {
              backgroundColor: '#00E676',
            },
          },
        },
      },
    },
  },
}); 