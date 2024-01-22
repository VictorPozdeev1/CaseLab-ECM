import { useCallback, type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Chip } from '@mui/material';
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import type { CompanyDocumentTypesModel, DocumentTypeAttribute } from '../';
import {
  DocumentTypeForm,
  type DocumentTypeFormProps,
} from './DocumentTypeForm';

export const DocumentTypesGrid: FC<{ model: CompanyDocumentTypesModel }> =
  observer(({ model }) => {
    // В итоге избавились от зависимости от model - можно теперь и вынести из компонента
    const renderAttributesCell = useCallback(
      (params: GridRenderCellParams<any, DocumentTypeAttribute[]>) => {
        if (params.value === undefined)
          return 'params.value === undefined at rendering a cell';
        const amount = params.value.length;
        if (amount === 0) return '<Нет атрибутов>';
        const first = params.value[0];
        return (
          <Box
            width={'100%'}
            sx={{ backgroundColor: 'transparent' }}
            // overflow={'hidden'}
          >
            {/* {params.value.map((dta: DocumentTypeAttribute) => (
              <Chip key={dta.id} label={dta.name} />
            ))} */}
            <Chip label={first.name} />
            {amount > 1 && ` и ещё ${amount - 1}...`}
            <Box sx={{ flex: '1 0' }}></Box>
          </Box>
        );
      },
      [],
    );

    const editClickHandler = useCallback(
      (documentTypeToEditId: number): void => {
        setFormProps({
          documentTypeId: documentTypeToEditId,
          onClose: () => {
            setFormProps(undefined);
          },
          model,
        });
      },
      [model.documentTypes?.value],
    );

    const columns: GridColDef[] = [
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
    ];

    const gridRows: GridRowsProp =
      model.documentTypes?.state === 'fulfilled'
        ? model.documentTypes.value.map((dt) => ({
            id: dt.id,
            name: dt.name,
            attributes: [...dt.attributes], // должно работать и без копирования, надо проверить
          }))
        : [];

    const [formProps, setFormProps] = useState<DocumentTypeFormProps>();

    return (
      <Box width={'100%'} height={'100%'}>
        <DataGrid
          rows={[...gridRows]}
          columns={columns}
          // getRowHeight={() => 'auto'}
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
