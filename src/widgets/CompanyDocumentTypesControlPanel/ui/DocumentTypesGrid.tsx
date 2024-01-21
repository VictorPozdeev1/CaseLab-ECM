import { useCallback, type FC, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Accordioned } from '@shared/components/Accordioned';

import type { CompanyDocumentTypesModel, DocumentTypeAttribute } from '../';

import { DocumentTypeAttributes } from './DocumentTypeAttributes';
import {
  DocumentTypeForm,
  type DocumentTypeFormProps,
} from './DocumentTypeForm';

export const DocumentTypesGrid: FC<{ model: CompanyDocumentTypesModel }> =
  observer(({ model }) => {
    const renderAttributesCell = useCallback(
      (params: GridRenderCellParams<any, DocumentTypeAttribute[]>) => {
        if (params.value === undefined) return 'value === undefined';
        if (model.documentAttributes?.state !== 'fulfilled')
          return 'loading...';
        return (
          <Box width={'100%'} sx={{ backgroundColor: 'transparent' }}>
            <Accordioned detailsName="список атрибутов">
              <DocumentTypeAttributes
                documentTypeAttributes={params.value}
                allAttributes={model.documentAttributes?.value}
                setTypeAttributes={() => {}}
              />
            </Accordioned>
            <Box sx={{ flex: '1 0' }}></Box>
          </Box>
        );
      },
      [model.documentAttributes?.value],
    );

    const editClickHandler = useCallback(
      (documentTypeToEditId: number): void => {
        setFormProps({
          documentTypeId: documentTypeToEditId,
          onClose: () => {
            setFormProps(undefined);
          },
          model: model,
        });
      },
      [model.documentTypes?.value],
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
        {
          field: 'actions',
          type: 'actions',
          width: 80,
          getActions: (params) => [
            <GridActionsCellItem
              key={'1'}
              icon={<EditIcon />}
              label="Edit"
              onClick={() => {
                editClickHandler(Number(params.id));
              }}
              showInMenu
            />,
            <GridActionsCellItem
              key={'2'}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {
                console.log(params.id);
              }}
              showInMenu
            />,
          ],
        },
      ],
      [renderAttributesCell],
    );

    const gridRows: GridRowsProp =
      model.documentTypes?.state === 'fulfilled'
        ? model.documentTypes?.value.map((dt) => ({
            id: dt.id,
            name: dt.name,
            attributes: dt.attributes,
          }))
        : [];

    const [formProps, setFormProps] = useState<DocumentTypeFormProps>();

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
          loading={model.documentTypes?.state === 'pending'}
        />
        {formProps !== undefined && <DocumentTypeForm {...formProps} />}
      </Box>
    );
  });
