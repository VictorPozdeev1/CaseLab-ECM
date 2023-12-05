import type { FC } from 'react';
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';
import { type DocumentDto } from '@api/generated';

/*
 Это сделано на основе примера из Getting Started.
 Возможно, дальше там другой принцип составления столбцов и строк, надо смотреть документацию дальше.
*/

interface OwnDocumentsTableProps {
  documents?: DocumentDto[];
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Название', flex: 4 },
  { field: 'docType', headerName: 'Тип', flex: 2 },
  { field: 'creationDate', headerName: 'Создан', flex: 2 },
  { field: 'status', headerName: 'Статус', flex: 2 },
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
  return <DataGrid rows={documentRows} columns={columns} />;
};
