import { LogoutButton } from '@components/LogoutButton/LogoutButton';
import { type FC } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import logo from './logo.png';

export const Header: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        padding: 'var(--paddings-pad-2, 16px)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        alignSelf: 'stretch',
        background: 'var(--colors-grey-highlight, #F7F7F7)',
        justifyContent: 'center',
        fontWeight: '500',
      }}
    >
      <Box
        sx={{
          width: '90%',
          display: 'flex',
          padding: 'var(--none, 0px)',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderRadius: 'var(--none, 0px)',
        }}
      >
        <img src={logo} alt="Логотип" width="150px" />
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
            fontFeatureSettings: "'clig' off, 'liga' off",
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '133.4%',
          }}
          variant="h5"
        >
          Название Организации
        </Typography>
        <Box
          sx={{
            display: 'flex',
            padding: 'var(--none, 0px)',
            alignItems: 'center',
            gap: 'var(--paddings-pad-1, 8px)',
            borderRadius: 'var(--none, 0px)',
          }}
        >
          <Avatar alt="Иванов И. И." src="/path/to/avatar.jpg" />
          <Typography
            variant="h6"
            sx={{
              marginRight: '30px',
              color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
              fontFeatureSettings: "'clig' off, 'liga' off",
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '133.4%',
            }}
          >
            Иванов И. И.
          </Typography>
          <LogoutButton />
        </Box>
      </Box>
    </Box>
  );
};
