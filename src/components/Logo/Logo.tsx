import { type FC } from 'react';
import { RosatomLogo } from '@components/Icons';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  hasText?: boolean;
  size?: 'large' | 'medium' | 'small';
}

const Logo: FC<LogoProps> = ({ size = 'small', hasText = true }) => {
  const sizeBaseline = 32;
  const fontBaseline = 16;
  let scale = 1;
  switch (size) {
    case 'small':
      scale = 1;
      break;
    case 'medium':
      scale = 2;
      break;
    case 'large':
      scale = 3;
      break;
  }
  const totalSize = sizeBaseline * scale;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: scale,
      }}
    >
      <RosatomLogo width={totalSize} height={totalSize} />
      {hasText && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: fontBaseline * scale,
          }}
        >
          Doc
          <Typography
            variant="inherit"
            component={'span'}
            sx={{ color: 'primary.main' }}
          >
            Flow
          </Typography>
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
