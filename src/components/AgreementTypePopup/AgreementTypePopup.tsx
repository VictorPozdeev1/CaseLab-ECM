// import { AgreementTypesBtnGroup } from '@components/AgreementTypesBtnGroup/AgreementTypesBtnGroup';
import { type DocTypeCreateDto } from '@api/generated';
import {
  Box,
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { type agreementType } from '@pages/AgreementsTypesPage/AgreementsTypesPage';
import { type FC } from 'react';
// import { useState, type FC } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  newTypeValue: DocTypeCreateDto;
  setNewTypeValue: React.Dispatch<React.SetStateAction<DocTypeCreateDto>>;
  children: JSX.Element;
}

const agreementTypes = [
  {
    title: 'Всеобщеее согласование',
    value: 'EVERYONE',
    id: 1,
  },
  {
    title: 'Один соглосующий',
    value: 'ANYONE ',
    id: 2,
  },
  {
    title: 'Кворум(50%)',
    value: 'QORUUM ',
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

export const AgreementTypePopup: FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  newTypeValue,
  setNewTypeValue,
}) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="dialog-title" open={isOpen}>
      <DialogTitle id="dialog-title">
        Создание нового типа документа
      </DialogTitle>
      <Box
        sx={{
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
          onChange={(e) => {
            console.log(e.target.value);
            setNewTypeValue(() => {
              return { ...newTypeValue, name: e.target.value };
            });
            console.log(newTypeValue);
          }}
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
          onChange={(e) => {
            setNewTypeValue(() => {
              return {
                ...newTypeValue,
                agreementType: e.target.value as agreementType,
              };
            });
            // console.log(e.target.value);
            console.log(newTypeValue);
          }}
        >
          {menuItems}
        </Select>
        {children}
      </Box>
    </Dialog>
  );
};
