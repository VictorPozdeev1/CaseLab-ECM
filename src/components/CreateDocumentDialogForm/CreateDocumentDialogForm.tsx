/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
import type { FC } from 'react';
import {
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';

import styles from './CreateDocumentDialogForm.module.css';

import { attributesStore, docTypesStore, documentsStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import {
  DataGrid,
  GridToolbarQuickFilter,
  // DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from '@mui/x-data-grid';
import { DocAttributeDto } from '@api/generated/models/DocAttributeDto';
import { toJS } from 'mobx';
interface CreateDocumentFormProps {
  onSubmit: (
    attributeValues: Array<{ attributeId: number; value: string }>,
  ) => void;
  onCancel: () => void;
}

export const CreateDocumentDialogForm: FC<CreateDocumentFormProps> = observer(
  ({ onSubmit, onCancel }) => {
    const [docType, setDocType] = useState('');
    const newDocAtrRef = useRef<
      Array<{ attributeId: number; value: string }> | []
    >([]);

    const handleDocTypeChange = (event: SelectChangeEvent): void => {
      setDocType(event.target.value);
    };

    // todo это надо как-то переделать по-человечески
    useEffect(() => {
      // void attributesStore.getAttributes();
      void docTypesStore.getAllDocTypes();
    }, []);

    const columns: GridColDef[] = [
      {
        field: 'name',
        headerName: 'Название',
        width: 200,
        editable: false,
      },
      {
        field: 'type',
        headerName: 'Тип',
        width: 200,
        editable: false,
      },
      {
        field: 'value',
        headerName: 'Значение',
        width: 200,
        editable: true,
      },
    ];
    const rows:
      | Array<{
          id?: number;
          name?: string;
          type?: string;
          value?: string;
        }>
      | undefined =
      docType === ''
        ? []
        : toJS(docTypesStore.docTypes)
          ? toJS(docTypesStore.docTypes)
              ?.filter((el) => el.name === docType)[0]
              .attributes?.map((a) => ({
                id: a.id,
                name: a.name,
                type: a.type,
                value: '',
              }))
          : [];

    console.log(rows);

    return (
      <Dialog
        className={styles.dialog}
        PaperProps={{ variant: 'elevation', className: styles.paper }}
        maxWidth={'md'}
        open={true}
        onClose={() => {
          console.log(
            'Пока что этот диалог сделан модальным, поэтому по клику по бэкдропу ничего не происходит.',
          );
        }}
      >
        <Paper sx={{ width: '100%' }}>
          <DialogTitle variant="h6" className={styles.title}>
            Создать документ
          </DialogTitle>
          <DialogContent sx={{ alignSelf: 'stretch' }}>
            <Box className={styles.inputGroup}>
              <TextField
                className={styles.documentNameInput}
                label="Название"
                variant="outlined"
              />
              <Select
                className={styles.documentTypeSelect}
                value={docType}
                label="Тип документа"
                onChange={handleDocTypeChange}
              >
                {docTypesStore.docTypes?.map((t) => (
                  <MenuItem key={t.id} value={t.name}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom={false}>
                Атрибуты
              </Typography>
              {/* <GridToolbarQuickFilter> </GridToolbarQuickFilter> */}
              <DataGrid
                processRowUpdate={(e) =>
                  (newDocAtrRef.current = [
                    ...newDocAtrRef.current,
                    { attributeId: e.id, value: e.value },
                  ])
                }
                rows={rows as DocAttributeDto[]}
                columns={columns}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                console.log('cancel clicked');
                onCancel();
              }}
            >
              Отменить
            </Button>
            <Button
              variant="contained"
              disabled={!docType}
              onClick={(e) => {
                console.log(rows);
                console.log('ok clicked');
                onSubmit(newDocAtrRef.current);
              }}
            >
              Создать
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    );
  },
);
