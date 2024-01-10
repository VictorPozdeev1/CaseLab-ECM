// import { currentUserStore } from '@store/index';
import React, { type FC } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const CreateDocumentButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        display: 'flex',
        height: '38px',
        padding: '8px 22px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '6px',
        background: 'var(--navy-blue, #035FA2)',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          padding: 'var(--none, 0px)',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--borderRadius, 4px)',
          borderRadius: 'var(--none, 0px)',
          boxShadow: 'none',
        }}
      >
        <AddIcon></AddIcon>
        Документ
      </Box>
    </Button>
  );
};
