import { Container } from '@mui/material';
import React, { type FC, type PropsWithChildren } from 'react';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {children}
    </Container>
  );
};
export { CenteredLayout };
