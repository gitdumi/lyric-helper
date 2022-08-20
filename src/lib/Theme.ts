import { createTheme } from '@mui/material/styles';

export const COLORS = {
  GREEN: '#1adebb',
  RED: '#F83F07',
  PURPLE: '#9719E6',
  BLUE: '#1a9fde',
  WHITE: '#000000'
};

export const SECTION_COLORS = [COLORS.GREEN, COLORS.BLUE, COLORS.RED, COLORS.PURPLE];

export function RANDOM_COLOR() {
  return SECTION_COLORS[Math.floor(Math.random() * SECTION_COLORS.length)];
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16
  },
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: {
      light: '',
      main: COLORS.GREEN,
      dark: '',
      contrastText: COLORS.WHITE
    },
    secondary: {
      main: COLORS.BLUE
    },
    success: {
      main: COLORS.BLUE
    },
    error: {
      main: COLORS.RED
    }
  }
});
