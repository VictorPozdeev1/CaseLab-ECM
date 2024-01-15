import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentSessionStore, type Permissions } from '@entities/session';
import { observer } from 'mobx-react-lite';

const RequirePermissionCheck: FC<{
  permission: Permissions;
  children: JSX.Element;
}> = observer(({ permission, children }) => {
  const currentLocation = useLocation();

  if (!currentSessionStore.permissions.includes(permission)) {
    return (
      <Navigate to="/Forbidden" state={{ previousLocation: currentLocation }} />
    );
  }
  return children;
});

export { RequirePermissionCheck };
