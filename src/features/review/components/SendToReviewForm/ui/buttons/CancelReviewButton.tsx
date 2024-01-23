import { Button, type ButtonProps } from '@mui/material';
import React, { type FC } from 'react';

export const CancelReviewButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="error"
      size="medium"
      component="button"
      type="submit"
      sx={{ minWidth: 'max-content' }}
      {...props}
    >
      {children ?? 'отозвать'}
    </Button>
  );
};
