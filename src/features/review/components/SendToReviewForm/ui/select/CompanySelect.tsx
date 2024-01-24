import { type CompanyModel } from '@entities/company/model';
import { MenuItem, TextField, type TextFieldProps } from '@mui/material';
import React, { type FC } from 'react';

export const CompanySelect: FC<
  TextFieldProps & { companiesList?: CompanyModel[] }
> = ({ value, disabled, onChange, companiesList, ...props }) => {
  return (
    <TextField
      autoComplete="off"
      size="small"
      select
      id="select-company"
      name="company"
      value={value}
      label="Организация"
      placeholder="Выберите организацию"
      disabled={disabled}
      onChange={onChange}
      sx={{ minWidth: '200px' }}
      {...props}
    >
      {companiesList !== undefined ? (
        companiesList.map((element) => (
          <MenuItem key={element.id} value={element.id}>
            {element.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem key={0} value={-1} />
      )}
    </TextField>
  );
};
