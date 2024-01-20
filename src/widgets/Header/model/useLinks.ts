import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { currentSessionStore, Permissions } from '@entities/session';

interface ILink {
  permission: Permissions;
  order: number;
  title: string;
  href: string | undefined;
}

export const useLinks = (): ILink[] => {
  const { companyId } = useParams();

  return useMemo(() => {
    const allLinks: ILink[] = [
      {
        order: 1,
        permission: Permissions.SPECIFIC_COMPANY_CONTROL_PANEL,
        title: 'Организации',
        get href() {
          if (companyId === undefined) return 'companies';
          return `/companies/${companyId}`;
        },
      },
      {
        order: 2,
        permission: Permissions.SPECIFIC_COMPANY_CONTROL_PANEL,
        title: 'Сотрудники',
        get href() {
          if (companyId === undefined) return undefined;
          return `/companies/${companyId}/employees`;
        },
      },
      {
        order: 3,
        permission: Permissions.SPECIFIC_COMPANY_CONTROL_PANEL,
        title: 'Шаблоны документов',
        get href() {
          if (companyId === undefined) return undefined;
          return `/documentTypes`; // Тут будет `/companies/${companyId}/documentTypes`;
        },
      },
      {
        order: 11,
        permission: Permissions.MY_COMPANY_CONTROL_PANEL,
        title: 'Моя организация',
        href: '/myCompany',
      },
      {
        order: 12,
        permission: Permissions.MY_COMPANY_CONTROL_PANEL,
        title: 'Сотрудники',
        href: '/myCompany/employees',
      },
      {
        order: 13,
        permission: Permissions.MY_COMPANY_CONTROL_PANEL,
        title: 'Шаблоны документов',
        href: 'myCompany/documentTypes',
      },
      {
        order: 21,
        permission: Permissions.USER,
        title: 'Мои документы',
        href: '/myDocuments',
      },
      {
        order: 22,
        permission: Permissions.USER,
        title: 'Документы организации',
        href: '/myCompanyDocuments', // Надо подумать, хуже или лучше будет myCompany/documents
      },
      {
        order: 23,
        permission: Permissions.USER,
        title: 'Процессы',
        href: '/myDocumentProcesses',
      },
    ];

    const permittedLinks = allLinks.filter((l) =>
      currentSessionStore.permissions.includes(l.permission),
    );

    const resolvedLinks = permittedLinks.filter((l) => l.href !== undefined);

    return resolvedLinks;
  }, [companyId]);
};
