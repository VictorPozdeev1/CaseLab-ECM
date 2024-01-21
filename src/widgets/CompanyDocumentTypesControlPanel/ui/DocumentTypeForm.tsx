import { type FC } from 'react';
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material';

import { type DocumentType } from '../model/DocumentType';

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
  initialData: DocumentType;
  onSubmit: (data: DocumentType) => void;
  onCancel: () => void;
  // isOpen: boolean;
  // onClose: () => void;
  // newTypeValue: DocTypeCreateDto;
  // setNewTypeValue: React.Dispatch<React.SetStateAction<DocTypeCreateDto>>;
  // children: JSX.Element;
}

export const DocumentTypeForm: FC<DocumentTypeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  // isOpen,
  // onClose,
  // children,
  // newTypeValue,
  // setNewTypeValue,
}) => {
  const data = initialData;

  return (
    <Dialog open={true}>
      <DialogTitle id="dialog-title">
        Создание нового типа документа
      </DialogTitle>
      <Box
        sx={{
          backgroundColor: 'violet',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 20px',
          margin: '5px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderRadius: '20px',
          color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
          fontFeatureSettings: "'clig' off, 'liga' off",
          fontFamily: 'Roboto',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '133.4%',
        }}
      >
        <TextField
          placeholder="Наименование"
          // onChange={(e) => {
          //   console.log(e.target.value);
          //   setNewTypeValue(() => {
          //     return { ...newTypeValue, name: e.target.value };
          //   });
          //   console.log(newTypeValue);
          // }}
          required
          id="TextField-1"
          label="Наименование"
          sx={{ paddingBottom: '10px' }}
        />
        <InputLabel id="select-label">Тип согласования</InputLabel>
        <Select
          sx={{ width: '223px' }}
          labelId="select-label"
          id="select"
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
      </Box>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => {
            onCancel();
          }}
        >
          Отменить
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onSubmit(data);
          }}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};