import { type FC } from 'react';
import Box from '@mui/material/Box';
import imagePath from './test.png';

export const DocumentPreview: FC = () => {
  return (
    <Box>
      <img alt="Description" src={imagePath} style={{ width: '100%' }} />
    </Box>
  );
};
