import { type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
