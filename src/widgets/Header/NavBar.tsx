import { type FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { currentSessionStore, Permissions } from '@entities/session';

interface ILinks {
  permission: Permissions;
  order: number;
  title: string;
  href: string | undefined;
}

export const NavBar: FC = () => {
  const { companyId } = useParams();

  const allLinks: ILinks[] = [
    {
      order: 1,
      permission: Permissions.SYSTEM_ADMIN,
      title: 'Организации',
      get href() {
        if (companyId === undefined) return 'company/1'; // Наверное, всё же не просто  "1" тут..
        return `/company/${companyId}`;
      },
    },
    {
      order: 2,
      permission: Permissions.SYSTEM_ADMIN,
      title: 'Сотрудники',
      get href() {
        if (companyId === undefined) return undefined;
        return `/company/${companyId}/users`;
      },
    },
    {
      order: 3,
      permission: Permissions.SYSTEM_ADMIN,
      title: 'Шаблоны документов',
      get href() {
        if (companyId === undefined) return undefined;
        return `/documentTypes`;
      },
    },
  ];

  const permittedLinks = allLinks.filter((l) =>
    currentSessionStore.permissions.includes(l.permission),
  );

  const resolvedLinks = permittedLinks.filter((l) => l.href !== undefined);

  return (
    <Box display={'flex'} gap={'20px'}>
      {resolvedLinks.map((l) => (
        <Link
          key={l.title}
          to={l.href as string} // undefined hrefs were filtered out above
          style={{
            color: 'black',
            textDecoration: 'inherit',
            fontSize: '18px',
          }}
        >
          {l.title}
        </Link>
      ))}
    </Box>
  );
};
