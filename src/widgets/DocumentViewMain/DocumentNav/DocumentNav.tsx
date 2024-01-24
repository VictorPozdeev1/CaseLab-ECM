import { type FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

export const DocumentNav: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant={'text'}
      startIcon={<ArrowBackIcon />}
      color="inherit"
      onClick={() => {
        navigate('/myDocuments');
      }}
      sx={{
        fontWeight: 'bold',
      }}
    >
      Документы
    </Button>
  );
};
