import { type Theme, createTheme } from '@mui/material';

const themeColors = {
  naviBlue: '#035FA2',
};
export const appTheme: Theme = createTheme({
  palette: {
    primary: {
      main: themeColors.naviBlue, // action-blue
    },
  },
});
