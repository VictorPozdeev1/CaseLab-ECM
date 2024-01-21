import { useCallback, type FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';

import { Accordioned } from '@shared/components/Accordioned';
import { type DocAttributeDto } from '@api';

import { DocumentTypesAttributesList } from './DocumentTypeAttributes';
import { type CompanyDocumentTypesModel } from '../';

export const DocumentTypesGrid: FC<{ model: CompanyDocumentTypesModel }> =
  observer(({ model }) => {
    const renderAttributesCell = useCallback(
      (params: GridRenderCellParams<any, DocAttributeDto[]>) => {
        if (params.value === undefined) return 'value === undefined';
        return (
          <Box width={'100%'} sx={{ backgroundColor: 'transparent' }}>
            <Accordioned detailsName="список атрибутов">
              <DocumentTypesAttributesList
                documentTypeAttributes={params.value}
                allAttributes={model.documentTypeAttributes}
                setTypeAttributes={() => {}}
              />
            </Accordioned>
            <Box sx={{ flex: '1 0' }}></Box>
          </Box>
        );
      },
      [model],
    );

    const columns: GridColDef[] = useMemo<GridColDef[]>(
      () => [
        {
          field: 'name',
          headerName: 'Название',
          flex: 1,
          hideable: false,
        },
        {
          field: 'attributes',
          headerName: 'Атрибуты',
          flex: 0,
          width: 500,
          hideable: false,
          renderCell: renderAttributesCell,
        },
      ],
      [renderAttributesCell],
    );

    const gridRows: GridRowsProp = model.documentTypes.map((dt) => ({
      id: dt.id,
      name: dt.name,
      attributes: dt.attributes,
    }));

    return (
      <Box width={'100%'} height={'100%'}>
        <DataGrid
          rows={[...gridRows]}
          columns={columns}
          getRowHeight={() => 'auto'}
          autoHeight
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          loading={model.documentTypes.length === 0} /* todo Переделать!! */
        />
      </Box>
    );
  });
