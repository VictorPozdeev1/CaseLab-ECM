import { LogoutButton } from '@features/logout';
import { type FC } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import rosatomIcon from '@assets/rosatomLogo.svg';
import Logo from '@shared/components/Logo/Logo';
import { AppBar, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <AppBar
      elevation={0}
      color="transparent"
      position="relative"
      sx={{ padding: 2 }}
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
        <Typography variant="h5" fontWeight={'bold'}>
          Название Организации
        </Typography>
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
            <Avatar sizes="40px" alt="Иванов И. И." src="/path/to/avatar.jpg" />
            <Typography variant="h6" sx={{ fontSize: '16px' }}>
              Иванов И. И.
            </Typography>
          </Box>
          <LogoutButton />
        </Box>
      </Container>
    </AppBar>
  );
};
