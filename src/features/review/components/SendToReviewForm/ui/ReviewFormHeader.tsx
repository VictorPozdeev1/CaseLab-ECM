import { Box, Button, Typography } from '@mui/material';
import React, { type MouseEventHandler, type FC } from 'react';

export interface ReviewFormHeaderProps {
  isOwnCompanyReviewer: boolean;
  toggleButtonVisible?: boolean;
  onButtonClick?: MouseEventHandler;
}

export const ReviewFormHeader: FC<ReviewFormHeaderProps> = ({
  isOwnCompanyReviewer,
  toggleButtonVisible = true,
  onButtonClick,
}) => {
  return (
    <Box display={'flex'} alignItems={'center'} gap={1} mb={2} ml={0.5}>
      <Typography variant="h6">Согласование</Typography>
      {toggleButtonVisible && (
        <Button
          component={'button'}
          variant="text"
          size="small"
          onClick={onButtonClick}
          sx={{
            borderRadius: 0,
            borderBottom: 1,
            pb: 0.1,
            pt: 0.1,
          }}
        >{`Направить в ${
          isOwnCompanyReviewer ? 'другую' : 'свою'
        } организацию`}</Button>
      )}
    </Box>
  );
};
