import { type FC } from 'react';
import { Box } from '@mui/material';
import { DocumentViewMain } from '@widgets/DocumentViewMain/DocumentViewMain';
// import { DocumentViewTimeline } from '@widgets/DocumentViewTimeline/DocumentViewTimeline';

export const DocumentViewPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
      }}
    >
      <DocumentViewMain />
      {/* <DocumentViewTimeline /> */}
    </Box>
  );
};
