import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Avatar, Box, AppBar, Container } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { LogoutButton } from '@features/logout';
import { currentSessionStore } from '@entities/session';
import Logo from '@shared/components/Logo/Logo';

import { NavBar } from './NavBar';

export const Header: FC = observer(() => {
  return (
    <AppBar
      elevation={0}
      color="default"
      position="relative"
      sx={{ pt: 2, pb: 2 }}
    >
      <Container
        disableGutters
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Logo hasText={true} size={'small'} />
        </Link>
        <NavBar />
        {/* <Typography variant="h5" fontWeight={'bold'}>
          {currentSessionStore.currentUserCompanyName}
        </Typography> */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Avatar
              sizes="40px"
              title={currentSessionStore.currentUserData.fullName}
            >
              {currentSessionStore.currentUserData.initials}
            </Avatar>
            <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
              <Typography variant="h6" sx={{ fontSize: '16px' }}>
                {currentSessionStore.currentUserData.shortName}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '16px' }}>
                {currentSessionStore.currentUserCompanyName}
              </Typography>
            </Box>
          </Box>
          <LogoutButton />
        </Box>
      </Container>
    </AppBar>
  );
});
