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

import { docTypesStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface CreateDocumentFormProps {
  onSubmit: (
    docTypeId: number,
    attributeValues: Array<{ attributeId: number; value: string }>,
  ) => void;
  onCancel: () => void;
}

export const CreateDocumentDialogForm: FC<CreateDocumentFormProps> = observer(
  ({ onSubmit, onCancel }) => {
    const [docTypeId, setDocTypeId] = useState<number>(0);
    const attributeValuesRef = useRef<
      Array<{ attributeId: number; value: string }> | []
    >([]);

    const handleDocTypeChange = (event: SelectChangeEvent): void => {
      setDocTypeId(+event.target.value);
    };

    // todo это надо как-то переделать по-человечески
    useEffect(() => {
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

    const rows =
      docTypesStore.docTypes
        ?.find((dt) => dt.id === docTypeId)
        ?.attributes?.map((a) => ({
          id: a.id,
          name: a.name,
          type: a.type,
          value: '',
        })) ?? [];

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
                value={docTypeId !== 0 ? docTypeId?.toString() : ''}
                label="Тип документа"
                onChange={handleDocTypeChange}
              >
                {docTypesStore.docTypes?.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
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
                processRowUpdate={(e) => {
                  attributeValuesRef.current = [
                    ...attributeValuesRef.current,
                    { attributeId: e.id, value: e.value },
                  ];
                  return e;
                }}
                rows={rows}
                columns={columns}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                onCancel();
              }}
            >
              Отменить
            </Button>
            <Button
              variant="contained"
              disabled={docTypeId === 0}
              onClick={(e) => {
                onSubmit(docTypeId, attributeValuesRef.current);
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
