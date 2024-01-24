import { Button, type ButtonProps } from '@mui/material';
import React, { type FC } from 'react';

export const SendToReviewButton: FC<ButtonProps> = ({ disabled, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      component="button"
      type="submit"
      sx={{ minWidth: 'max-content' }}
      disabled={disabled}
      {...props}
    >
      ОТПРАВИТЬ
    </Button>
  );
};
