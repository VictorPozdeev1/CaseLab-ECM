import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { errorStore } from '@shared/appError';
import { currentSessionStore } from '@entities/session';

const CustomAlert: React.FC = () => {
  const message = errorStore.errorMessage;

  const handleYesClick = (): void => {
    currentSessionStore.logout();
  };

  const handleNoClick = (): void => {
    errorStore.clearError();
  };

  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
      <Box style={{ marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleYesClick}>
          Да
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: '8px' }}
          onClick={handleNoClick}
        >
          Нет
        </Button>
      </Box>
    </Alert>
  );
};

export default CustomAlert;
