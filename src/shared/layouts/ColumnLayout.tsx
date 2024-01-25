import { Container } from '@mui/material';
import { Header } from '@widgets/Header';
import { type FC, type PropsWithChildren } from 'react';

export const ColumnLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Header />
      {children}
    </Container>
  );
};
