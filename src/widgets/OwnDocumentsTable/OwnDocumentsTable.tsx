import type { FC } from 'react';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';

import { type Document } from '@entities/document';
import { statusChips, downloadDocumentFile } from '@entities/document';
import styles from './OwnDocumentsTable.module.css';

/*
 Это сделано на основе примера из Getting Started.
 Возможно, дальше там другой принцип составления столбцов и строк, надо смотреть документацию дальше.
*/

interface OwnDocumentsTableProps {
  documents?: Document[];
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
      params: GridRenderCellParams<any, keyof typeof statusChips | undefined>,
    ) => (params.value !== undefined ? statusChips[params.value] : null),
  },
];

export const OwnDocumentsTable: FC<OwnDocumentsTableProps> = observer(
  ({ documents }) => {
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
        onRowDoubleClick={(params) => {
          void downloadDocumentFile(Number(params.id));
        }}
        sx={{
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      />
    );
  },
);
