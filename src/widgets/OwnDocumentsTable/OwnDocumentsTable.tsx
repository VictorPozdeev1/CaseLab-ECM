import type { FC } from 'react';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';

import { type Document } from '@entities/document';
import { statusChips } from '@entities/document';
import { useNavigate } from 'react-router';

interface OwnDocumentsTableProps {
  documents?: Document[];
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Название',
    flex: 1,
    hideable: false,
  },
  {
    field: 'documentType',
    headerName: 'Тип',
    flex: 1,
    hideable: false,
  },
  {
    field: 'creationDate',
    headerName: 'Создан',
    type: 'date',
  },
  {
    field: 'status',
    headerName: 'Статус',
    minWidth: 150,
    renderCell: (
      params: GridRenderCellParams<any, keyof typeof statusChips | undefined>,
    ) => (params.value !== undefined ? statusChips[params.value] : null),
  },
];

export const OwnDocumentsTable: FC<OwnDocumentsTableProps> = observer(
  ({ documents }) => {
    const navigate = useNavigate();
    const documentRows: GridRowsProp =
      documents?.map((d) => ({
        id: d.id,
        name: d.name,
        documentType: d.docTypeName,
        creationDate: d.date,
        status: d.finalDocStatus,
      })) ?? [];

    return (
      <DataGrid
        rows={[...documentRows]}
        columns={columns}
        autoHeight
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        pageSizeOptions={[25, 50]}
        loading={documents === undefined}
        onRowDoubleClick={(params) => {
          navigate(`./${params.row.name}`, {
            state: { documentId: params.id },
          });
        }}
      />
    );
  },
);
