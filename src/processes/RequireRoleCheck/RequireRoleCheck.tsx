import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentSessionStore } from '@store/index';
import { observer } from 'mobx-react-lite';

const RequireRoleCheck: FC<{ role: string; children: JSX.Element }> = observer(
  ({ role, children }) => {
    const currentLocation = useLocation();

    if (!currentSessionStore.roles.includes(role)) {
      return (
        <Navigate
          to="/Forbidden"
          state={{ previousLocation: currentLocation }}
        />
      );
    }
    return children;
  },
);

export { RequireRoleCheck };
