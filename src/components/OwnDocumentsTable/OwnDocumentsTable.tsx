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
import { observer } from 'mobx-react-lite';

const chips = {
  NEW: (
    <Chip
      label="Создан"
      color="default"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M14.5587 9.02L15.4787 9.94L6.41875 19H5.49875V18.08L14.5587 9.02ZM18.1587 3C17.9087 3 17.6487 3.1 17.4587 3.29L15.6287 5.12L19.3787 8.87L21.2087 7.04C21.5987 6.65 21.5987 6.02 21.2087 5.63L18.8687 3.29C18.6687 3.09 18.4187 3 18.1587 3ZM14.5587 6.19L3.49875 17.25V21H7.24875L18.3087 9.94L14.5587 6.19Z"
            fill="#0F0F0F"
            fillOpacity="0.941176"
          />
        </svg>
      }
    />
  ),
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
  APPROVED: null,
  REJECTED: null,
  CORRECTING: null,
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

export const OwnDocumentsTable: FC<OwnDocumentsTableProps> = observer(
  ({ documents }) => {
    const documentRows: GridRowsProp =
      documents?.map((d) => ({
        id: d.id,
        name: d.name,
        docType: d.docTypeName,
        // creationDate: new Date(d.date),
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
  },
);
