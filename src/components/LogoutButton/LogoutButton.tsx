import React from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton } from '@mui/material';
import { currentUserStore } from '@store/index';
import { Logout } from '@mui/icons-material';

export const LogoutButton: React.FC = observer(() => {
  if (!currentUserStore.isAuth) return null;

  return (
    <IconButton
      color="primary"
      size="large"
      onClick={() => {
        currentUserStore.logout();
      }}
    >
      <Logout />
    </IconButton>
  );
});
