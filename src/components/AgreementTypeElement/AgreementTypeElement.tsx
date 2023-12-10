import { type DocTypeDto } from '@api/generated';
import { Box, Divider, TextField } from '@mui/material';
import { type FC } from 'react';
import { Delete } from '@mui/icons-material';

interface PropType {
  type: DocTypeDto;
  children?: JSX.Element;
}

export const AgreementTypeElement: FC<PropType> = ({ type, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        // padding: 'var(--paddings-pad-2, 16px) var(--none, 0px)',
        padding: '20px 20px',
        margin: '5px',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        // borderRadius: 'var(--none, 0px)',
        borderRadius: '20px',
        border: '2px solid #1565c0',
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
        id="standard-basic"
        label="Название типа документа"
        variant="standard"
        //   value=
        defaultValue={type.name}
      />
      {children}
      <Delete sx={{ cursor: 'pointer', color: '#1565c0' }} />
      <Divider />
    </Box>
  );
};
