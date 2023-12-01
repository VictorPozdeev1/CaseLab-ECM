import { type FC } from 'react';
import { currentUserStore } from '@store/index';

export const LogoutButton: FC = () => {
  if (!currentUserStore.isAuth) return null;
  return (
    <button
      onClick={() => {
        currentUserStore.logout();
      }}
    >
      Выход!
    </button>
  );
};
