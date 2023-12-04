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
  { field: 'name', headerName: 'Название', width: 300 },
  { field: 'anotherColumn', headerName: 'Ещё столбец', width: 300 },
];

export const OwnDocumentsTable: FC<OwnDocumentsTableProps> = ({
  documents,
}) => {
  const documentRows: GridRowsProp =
    documents?.map((d) =>
      // <OwnDocument key={d.id} document={d}></OwnDocument>
      ({ ...d, anotherColumn: d.name + ' status' }),
    ) ?? [];
  return <DataGrid rows={documentRows} columns={columns} />;
};
