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
  InputLabel,
  FormControl,
} from '@mui/material';

import styles from './CreateDocumentDialogForm.module.css';

import { docTypesStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface CreateDocumentFormProps {
  onSubmit: (docTypeId: number, attributeValues: Map<number, string>) => void;
  onCancel: () => void;
}

export const CreateDocumentDialogForm: FC<CreateDocumentFormProps> = observer(
  ({ onSubmit, onCancel }) => {
    const [docTypeId, setDocTypeId] = useState<number>(0);
    const attributeValuesRef = useRef<Map<number, string>>(new Map());

    const handleDocTypeChange = (event: SelectChangeEvent): void => {
      setDocTypeId(+event.target.value);
    };

    // todo это надо как-то переделать по-человечески
    useEffect(() => {
      void docTypesStore.loadAllForMyCompany();
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
          <DialogTitle variant="h6" fontWeight={600}>
            Создать документ
          </DialogTitle>
          <DialogContent sx={{ alignSelf: 'stretch' }}>
            <Box className={styles.inputGroup}>
              <TextField
                className={styles.documentNameInput}
                label="Название"
                variant="outlined"
                InputProps={{
                  style: {
                    borderRadius: '8px',
                  },
                }}
              />
              <FormControl sx={{ width: '60%' }}>
                <InputLabel id="select-label">Тип</InputLabel>
                <Select
                  labelId="select-label"
                  className={styles.documentTypeSelect}
                  value={docTypeId !== 0 ? docTypeId?.toString() : ''}
                  label={'Тип'}
                  onChange={handleDocTypeChange}
                  style={{ borderRadius: '8px' }}
                >
                  {docTypesStore.docTypes?.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {docTypeId !== 0 && (
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom={false}
                  fontWeight={600}
                  marginTop={'8px'}
                >
                  Атрибуты
                </Typography>
                {/* <GridToolbarQuickFilter> </GridToolbarQuickFilter> */}
                <DataGrid
                  processRowUpdate={(cell) => {
                    attributeValuesRef.current.set(cell.id, cell.value);
                    return cell;
                  }}
                  rows={rows}
                  columns={columns}
                  sx={{
                    width: '100%',
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                      display: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                      display: 'none',
                    },
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: 'rgb(0, 0, 0, 0.6)' }}
              color="inherit"
              onClick={() => {
                onCancel();
              }}
            >
              Отменить
            </Button>
            <Button
              variant="text"
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
