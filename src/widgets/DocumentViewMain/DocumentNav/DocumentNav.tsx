import { type FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useLocation, useNavigate } from 'react-router';
import { Button } from '@mui/material';

export const DocumentNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      variant={'text'}
      startIcon={<ArrowBackIcon />}
      onClick={() => {
        // возвращаемся с /myDocument/:documentName на
        navigate(location.pathname.match(/^\/.+\//)?.[0] as string);
      }}
    >
      Документы
    </Button>
  );
};
