import { type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '@shared/themes/theme';
import { CssBaseline } from '@mui/material';

const App: FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline>
        <ThemeProvider theme={appTheme}>
          <AppRoutes />
        </ThemeProvider>
      </CssBaseline>
    </BrowserRouter>
  );
};

export default App;
