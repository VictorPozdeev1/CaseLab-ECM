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
        maxWidth={'md'}
        disableGutters
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
            gap: 1,
          }}
        >
          <Avatar sizes="40px" alt="Иванов И. И." src="/path/to/avatar.jpg" />
          <Typography variant="h6">Иванов И. И.</Typography>
          <LogoutButton />
        </Box>
      </Container>
    </AppBar>
  );
};
