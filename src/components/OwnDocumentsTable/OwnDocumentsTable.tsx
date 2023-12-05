import type { FC } from 'react';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import { type DocumentDto } from '@api/generated';
import styles from './OwnDocumentsTable.module.css';
import { Chip } from '@mui/material';

const chips = {
  WAITING_FOR_APPROVE: (
    <Chip
      label="На рассмотрении"
      color="info"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M12.5 2C7 2 2.5 6.5 2.5 12C2.5 17.5 7 22 12.5 22C18 22 22.5 17.5 22.5 12C22.5 6.5 18 2 12.5 2ZM12.5 20C8.09 20 4.5 16.41 4.5 12C4.5 7.59 8.09 4 12.5 4C16.91 4 20.5 7.59 20.5 12C20.5 16.41 16.91 20 12.5 20ZM13 7H11.5V13L16.7 16.2L17.5 14.9L13 12.2V7Z"
            fill="white"
          />
        </svg>
      }
    />
  ),
};

/*
 Это сделано на основе примера из Getting Started.
 Возможно, дальше там другой принцип составления столбцов и строк, надо смотреть документацию дальше.
*/

interface OwnDocumentsTableProps {
  documents?: DocumentDto[];
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Название',
    flex: 4,
    headerClassName: styles.tableHeaderText,
  },
  {
    field: 'docType',
    headerName: 'Тип',
    flex: 2,
    headerClassName: styles.tableHeaderText,
  },
  {
    field: 'creationDate',
    headerName: 'Создан',
    flex: 2,
    headerClassName: styles.tableHeaderText,
    type: 'date',
  },
  {
    field: 'status',
    headerName: 'Статус',
    flex: 2,
    headerClassName: styles.tableHeaderText,
    renderCell: (
      params: GridRenderCellParams<any, keyof typeof chips | undefined>,
    ) => (params.value !== undefined ? chips[params.value] : null),
  },
];

export const OwnDocumentsTable: FC<OwnDocumentsTableProps> = ({
  documents,
}) => {
  const documentRows: GridRowsProp =
    documents?.map((d) => ({
      id: d.id,
      name: d.name,
      docType: d.docTypeName,
      creationDate: d.date,
      status: d.finalDocStatus,
    })) ?? [];
  return (
    <DataGrid
      rows={documentRows}
      columns={columns}
      getRowClassName={(_) => styles.tableRowText}
    />
  );
};
