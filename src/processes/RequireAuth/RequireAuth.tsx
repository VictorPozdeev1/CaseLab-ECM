import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentSessionStore, errorStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import Unauthorized from '@processes/RequireAuth/Unauthorized';

const RequireAuth: FC<{ children: JSX.Element }> = observer(({ children }) => {
  const currentLocation = useLocation();

  if (!currentSessionStore.isAuth) {
    return (
      <Navigate to="/Login" state={{ previousLocation: currentLocation }} />
    );
  }
  return (
    <>
      {errorStore.showError && <Unauthorized />}
      <>{children}</>
    </>
  );
});

export { RequireAuth };
