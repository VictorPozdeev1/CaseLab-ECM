import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentUser } from '@store/store';
import { observer } from 'mobx-react-lite';

const RequireAuth: FC<{ children: JSX.Element }> = ({ children }) => {
  const currentLocation = useLocation();

  if (!currentUser.isAuth) {
    return (
      <Navigate to="/Login" state={{ previousLocation: currentLocation }} />
    );
  }
  return children;
};

export default observer(RequireAuth);
