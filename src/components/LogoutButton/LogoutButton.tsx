import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { currentUserStore } from '@store/index';

export const LogoutButton: React.FC = observer(() => {
  if (!currentUserStore.isAuth) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={() => {
        currentUserStore.logout();
      }}
    >
      Выход
    </Button>
  );
});
