import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentSessionStore } from '@store/index';
import { observer } from 'mobx-react-lite';

import { type Permissions } from '@store/session';

const RequirePermissionCheck: FC<{
  permission: Permissions;
  children: JSX.Element;
}> = observer(({ permission: role, children }) => {
  const currentLocation = useLocation();

  if (!currentSessionStore.permissions.includes(role)) {
    return (
      <Navigate to="/Forbidden" state={{ previousLocation: currentLocation }} />
    );
  }
  return children;
});

export { RequirePermissionCheck };
