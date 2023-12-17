import React from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton } from '@mui/material';
import { currentSessionStore } from '@store/index';
import { Logout } from '@mui/icons-material';

export const LogoutButton: React.FC = observer(() => {
  if (!currentSessionStore.isAuth) return null;

  return (
    <IconButton
      color="primary"
      size="large"
      onClick={() => {
        currentSessionStore.logout();
      }}
    >
      <Logout />
    </IconButton>
  );
});
