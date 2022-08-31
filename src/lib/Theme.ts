import { createTheme } from '@mui/material/styles';

export const COLORS = {
  GREEN: '#4bdec4',
  RED: '#fc7b53',
  PURPLE: '#ad85ff',
  BLUE: '#43b9f0',
  YELLOW: '#f7cb7e',
  WHITE: '#000000'
};

export const SECTION_COLORS = [COLORS.GREEN, COLORS.BLUE, COLORS.YELLOW, COLORS.RED, COLORS.PURPLE];

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
