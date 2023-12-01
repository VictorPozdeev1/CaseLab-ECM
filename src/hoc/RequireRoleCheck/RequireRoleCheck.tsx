import { useEffect, type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentUserStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import Spinner from '@widgets/Spinner/Spinner';

const RequireRoleCheck: FC<{ role: string; children: JSX.Element }> = ({
  role,
  children,
}) => {
  const currentLocation = useLocation();
  useEffect(() => {
    void currentUserStore.getData();
  }, []);

  if (currentUserStore.isLoading) {
    return <Spinner />;
  } else if (currentUserStore.data?.role !== role) {
    return (
      <Navigate to="/Forbidden" state={{ previousLocation: currentLocation }} />
    );
  }
  return children;
};

export default observer(RequireRoleCheck);
