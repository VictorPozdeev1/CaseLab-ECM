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
      sx={{
        display: 'flex',
        height: '38px',
        padding: '8px 22px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '6px',
        background: 'var(--navy-blue, #035FA2)',
      }}
    >
      Выход
    </Button>
  );
});
