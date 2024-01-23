import { TextField, type TextFieldProps } from '@mui/material';
import React, { type FC } from 'react';

export const CommentInput: FC<
  Pick<TextFieldProps, 'disabled' | 'onChange' | 'value'>
> = ({ disabled, value, onChange }) => {
  return (
    <TextField
      autoComplete="off"
      fullWidth
      multiline
      label="Комментарий"
      placeholder="Введите комментарий"
      maxRows={3}
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
  );
};
