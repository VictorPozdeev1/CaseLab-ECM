import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  // type GridRenderCellParams,
} from '@mui/x-data-grid';

import { type CompanyDocumentTypesModel } from '../';
import { toJS } from 'mobx';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Название',
    flex: 1,
    width: 400,
    hideable: false,
  },
  {
    field: 'attributes',
    headerName: 'Атрибуты',
    flex: 1,
    width: 600,
    hideable: false,
    renderCell: (params) => {
      console.log('params: ', toJS(params.value));
      return 'ACCORDION WILL BE HERE';
    },
    // params.value !== undefined ? statusChips[params.value] : null,
  },
];

export const DocumentTypesGrid: FC<{ model: CompanyDocumentTypesModel }> =
  observer(({ model }) => {
    const gridRows: GridRowsProp = model.data.map((dt) => ({
      id: dt.id,
      name: dt.name,
      attributes: dt.attributes,
    }));

    return (
      <Box width={'100%'} height={'100%'}>
        <DataGrid
          rows={[...gridRows]}
          columns={columns}
          autoHeight
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          loading={model.data.length === 0} /* todo Переделать!! */
        />
      </Box>
    );
  });
