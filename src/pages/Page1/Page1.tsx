import { type FC } from 'react';
import { MenuItem, Select } from '@mui/material';

import { Roles } from '@entities/user';

export const Page1: FC = () => {
  return (
    <div>
      <p>This is one of our pages</p>
      <Select sx={{ width: '200px' }}>
        {Object.values(Roles).map((role, i) => (
          <MenuItem key={i} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
