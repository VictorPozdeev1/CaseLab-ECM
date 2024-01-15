import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentSessionStore } from '@entities/session';
import { errorStore } from '@shared/appError';
import { observer } from 'mobx-react-lite';
import UnauthorizedAlert from './UnauthorizedAlert';

const RequireAuth: FC<{ children: JSX.Element }> = observer(({ children }) => {
  const currentLocation = useLocation();

  if (!currentSessionStore.isAuth) {
    return (
      <Navigate to="/Login" state={{ previousLocation: currentLocation }} />
    );
  }
  return (
    <>
      {errorStore.showError && <UnauthorizedAlert />}
      <>{children}</>
    </>
  );
});

export { RequireAuth };
