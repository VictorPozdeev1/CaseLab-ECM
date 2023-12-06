import { type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '@style/theme';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
