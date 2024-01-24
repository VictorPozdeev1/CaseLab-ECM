import { type User } from '@entities/user';
import { MenuItem, TextField, type TextFieldProps } from '@mui/material';
import React, { type FC } from 'react';

export const ReviewerSelect: FC<TextFieldProps & { userList?: User[] }> = ({
  value,
  disabled,
  onChange,
  userList,
  ...props
}) => {
  return (
    <TextField
      autoComplete="off"
      fullWidth
      size="small"
      select
      // SelectProps={{ multiple: true }}
      id="select-reviewer"
      name="reviewer"
      value={value}
      label="Проверяющий(ая)"
      placeholder="Выберите проверяющего"
      disabled={disabled}
      onChange={onChange}
      sx={{ minWidth: '200px' }}
      {...props}
    >
      {userList !== undefined ? (
        userList.map((element) => (
          <MenuItem key={element.id} value={element.id}>
            {element.shortName}
          </MenuItem>
        ))
      ) : (
        <MenuItem key={0} value={-1} />
      )}
    </TextField>
  );
};
