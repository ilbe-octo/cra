import { createTheme } from '@mui/material/styles/';
import '@fontsource/open-sans';
import '@fontsource/open-sans-condensed/700.css';

const Color = {
  WHITE: '#FFF',
  BLACK: '#000',
  ORANGE: '#e86441',
  DARK_GREY: '#757575',
  RED: '#ff6d43',
  GREEN: '#68ce3e',
};

export const FONT_FAMILY = {
  OPEN_SANS: 'Open Sans',
  OPEN_SANS_CONDENSED: 'Open Sans Condensed',
};

export const primaryTheme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: [FONT_FAMILY.OPEN_SANS].join(','),
    subtitle1: {
      fontFamily: FONT_FAMILY.OPEN_SANS_CONDENSED,
    },
    h6: {
      fontFamily: FONT_FAMILY.OPEN_SANS_CONDENSED,
    },
  },
  palette: {
    primary: {
      main: Color.BLACK,
      light: Color.WHITE,
    },
    secondary: {
      main: Color.ORANGE,
    },
    error: {
      main: Color.RED,
    },
    success: {
      main: Color.GREEN,
    },
  },
  spacing: 10,
});
