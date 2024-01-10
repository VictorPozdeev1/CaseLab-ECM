import { type Theme, createTheme } from '@mui/material';
import { ruRU as dataruRu } from '@mui/x-data-grid';
import { ruRU as pickersruRU } from '@mui/x-date-pickers/locales';
import { ruRU as coreruRU } from '@mui/material/locale';
const themeColors = {
  naviBlue: '#035FA2',
};
export const appTheme: Theme = createTheme(
  {
    palette: {
      primary: {
        main: themeColors.naviBlue, // action-blue
      },
    },
  },
  coreruRU,
  pickersruRU,
  dataruRu,
);
