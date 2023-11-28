import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentUser } from '@store/store';
import { observer } from 'mobx-react-lite';

const RequireRoleCheck: FC<{ role: string; children: JSX.Element }> = ({
  role,
  children,
}) => {
  const currentLocation = useLocation();

  if (!currentUser.roles.includes(role)) {
    return (
      <Navigate to="/Forbidden" state={{ previousLocation: currentLocation }} />
    );
  }
  return children;
};

export default observer(RequireRoleCheck);
