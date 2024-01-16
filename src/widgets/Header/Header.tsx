import { LogoutButton } from '@features/logout';
import { type FC } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Logo from '@shared/components/Logo/Logo';
import { AppBar, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { currentSessionStore } from '@store/index';
import { observer } from 'mobx-react-lite';

interface ILinks {
  title: string;
  href: string;
}

const Links: ILinks[] = [
  {
    title: 'Главная',
    href: '/',
  },
  {
    title: 'Пользователи',
    href: '/',
  },
  {
    title: 'Типы документов',
    href: '/documentTypes',
  },
];

export const Header: FC = observer(() => {
  return (
    <AppBar
      elevation={0}
      color="transparent"
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
        <Box display={'flex'} gap={'20px'}>
          {Links.map((el) => {
            return (
              <Link
                key={el.title}
                to={el.href}
                style={{
                  color: 'black',
                  textDecoration: 'inherit',
                  fontSize: '18px',
                }}
              >
                {el.title}
              </Link>
            );
          })}
        </Box>
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
