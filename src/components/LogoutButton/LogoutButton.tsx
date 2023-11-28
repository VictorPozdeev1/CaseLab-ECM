import { type FC } from 'react';
import { currentUser } from '@store/store';

export const LogoutButton: FC = () => {
  if (!currentUser.isAuth) return null;
  return (
    <button
      onClick={() => {
        currentUser.logout();
      }}
    >
      Выход!
    </button>
  );
};
