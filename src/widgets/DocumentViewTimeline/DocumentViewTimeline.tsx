import React, { type FC } from 'react';
import Container from '@mui/material/Container';
import { DocumentLifeCycle } from './DocumentLifeCycle/DocumentLifeCycle';

export const DocumentViewTimeline: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        width: '250px',
        padding: '64px var(--none, 0px)',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        alignSelf: 'stretch',
        borderRadius: 'var(--none, 0px)',
        borderTop: 'var(--none, 0px) solid var(--colors-base-stroke, #E5E5E5)',
        borderRight:
          'var(--none, 0px) solid var(--colors-base-stroke, #E5E5E5)',
        borderBottom:
          'var(--none, 0px) solid var(--colors-base-stroke, #E5E5E5)',
        borderLeft: '1px solid var(--colors-base-stroke, #E5E5E5)',
        background: '#E5E5E5',
      }}
    >
      <DocumentLifeCycle></DocumentLifeCycle>
    </Container>
  );
};
