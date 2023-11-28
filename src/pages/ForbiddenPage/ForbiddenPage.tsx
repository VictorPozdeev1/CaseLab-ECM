import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ForbiddenPage: FC = () => {
  const { state } = useLocation();
  const forbiddenUrl: string = state?.previousLocation?.pathname as string; // query parameters ???
  return forbiddenUrl?.length > 0 ? (
    <div>Нет прав на роут {forbiddenUrl}. А жаль.</div>
  ) : (
    <Navigate to="/" />
  );
};
