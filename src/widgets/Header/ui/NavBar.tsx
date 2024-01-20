import { type FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Box } from '@mui/material';

import { useLinks } from '../model/useLinks';

export const NavBar: FC = () => {
  const links = useLinks();

  return (
    <Box display={'flex'} gap={'20px'}>
      {links.map((l) => (
        <Link
          sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}
          underline="hover"
          component={RouterLink}
          key={l.title}
          to={l.href as string} // undefined hrefs were filtered out above
        >
          {l.title}
        </Link>
      ))}
    </Box>
  );
};
