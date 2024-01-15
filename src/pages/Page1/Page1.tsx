import { useState, type FC } from 'react';
import { MenuItem, Select } from '@mui/material';

import { Roles } from '@entities/user';

export const Page1: FC = () => {
  const [role, setRole] = useState<Roles>();
  return (
    <div>
      <p>This is one of our pages</p>
      <Select
        sx={{ width: '200px' }}
        value={role ?? ''}
        onChange={(e) => {
          setRole(e.target.value as Roles);
        }}
      >
        {Object.entries(Roles).map((e) => (
          <MenuItem key={e[0]} value={e[0]}>
            {e[1]}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
