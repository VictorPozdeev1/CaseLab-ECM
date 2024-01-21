import { type FC } from 'react';
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  DialogContent,
  FormControl,
  Alert,
  Stack,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { type DocumentType, type CompanyDocumentTypesModel } from '../';
import { DocumentTypeAttributes } from './DocumentTypeAttributes';

const agreementTypes = [
  {
    title: 'Всеобщее согласование',
    value: 'EVERYONE',
    id: 1,
  },
  {
    title: 'Один согласующий',
    value: 'ANYONE ',
    id: 2,
  },
  {
    title: 'Кворум (50%)',
    value: 'QUORUM ',
    id: 3,
  },
];

const menuItems = agreementTypes.map((el) => {
  return (
    <MenuItem value={el.value} key={el.id}>
      {el.title}
    </MenuItem>
  );
});

export interface DocumentTypeFormProps {
  documentTypeId: number;
  model: CompanyDocumentTypesModel;
  onClose: () => void;
}

export const DocumentTypeForm: FC<DocumentTypeFormProps> = observer(
  ({ documentTypeId, model, onClose }) => {
    if (
      model.documentTypes?.state !== 'fulfilled' ||
      model.documentAttributes?.state !== 'fulfilled'
    ) {
      console.error(
        "model.documentTypes?.state !== 'fulfilled' on editClickHandler",
      );
      return <Alert>Данные не загружены</Alert>;
    }
    const documentTypeData = model.documentTypes.value.find(
      (dt) => dt.id === documentTypeId,
    ) as DocumentType;

    return (
      <Dialog fullWidth open={true}>
        <DialogTitle id="dialog-title">Какой-то заголовок</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Stack spacing={2}>
            <TextField
              sx={{ flex: '1' }}
              label="Название"
              required
              variant="standard"
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setNewTypeValue(() => {
              //     return { ...newTypeValue, name: e.target.value };
              //   });
              //   console.log(newTypeValue);
              // }}
            />

            <FormControl variant="standard" sx={{ flex: '1' }}>
              <InputLabel id="demo-simple-select-standard-label">
                Тип согласования
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Тип согласования"
                // onChange={(e) => {
                //   setNewTypeValue(() => {
                //     return {
                //       ...newTypeValue,
                //       agreementType: e.target.value as DocTypeCreateDto.agreementType,
                //     };
                //   });
                // }}
              >
                {menuItems}
              </Select>
            </FormControl>
          </Stack>
          <DocumentTypeAttributes
            documentTypeAttributes={documentTypeData.attributes}
            allAttributes={model.documentAttributes.value}
            setTypeAttributes={() => {}}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
            }}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              /* Заблокировать форму */
              // model
              //   .updateUser(userData)
              //   .then() /* Закрыть форму */
              //   .catch(() => {}) /* Оставить форму открытой и показать ошибку */
              //   .finally(); /* Разблокировать форму */
              // setUserFormProps(undefined);
            }}
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);
