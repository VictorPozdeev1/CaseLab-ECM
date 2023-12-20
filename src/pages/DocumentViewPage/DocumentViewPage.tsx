import { type FC } from 'react';
import { Box } from '@mui/material';
import { DocumentViewMain } from '@widgets/DocumentViewMain/DocumentViewMain';
import { DocumentViewTimeline } from '@widgets/DocumentViewTimeline/DocumentViewTimeline';

export const DocumentViewPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        padding: 'var(--none, 0px)',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 'var(--none, 0px)',
        alignSelf: 'stretch',
        borderRadius: 'var(--none, 0px)',
        margin: 0,
      }}
    >
      <DocumentViewMain />
      <DocumentViewTimeline />
    </Box>
  );
};
