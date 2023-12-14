import { type DocAttributeDto, type DocTypeDto } from '@api/generated';
import { Box, Divider, TextField } from '@mui/material';
import { type FC, useRef } from 'react';
import { Delete } from '@mui/icons-material';
import { AgreementTypesAccordion } from '@components/AgreementTypesAccordion/AgreementTypesAccordion';
import { AgreementTypesAttributesList } from '@components/AgreementTypesAttributesList/AgreementTypesAttributesList';
import { AgreementTypesBtnGroup } from '@components/AgreementTypesBtnGroup/AgreementTypesBtnGroup';
import { observer } from 'mobx-react-lite';

interface PropType {
  key: number | undefined;
  type: DocTypeDto;
  allAttributes: DocAttributeDto[] | undefined;
}

export const AgreementTypeElement: FC<PropType> = observer(
  ({ type, allAttributes }) => {
    // const [typeAttributes, setTypeAttributes] = useState<
    //   DocAttributeDto[] | undefined
    // >(type?.attributes);
    const typeAttributesId = type.attributes?.map((el) => el.id as number);
    const typeAttributesRef = useRef<number[] | undefined>(typeAttributesId);
    return (
      <Box
        sx={{
          display: 'flex',
          padding: '20px 20px',
          margin: '5px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
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
          defaultValue={type.name}
          title={type.name}
        />
        <AgreementTypesAccordion>
          <>
            <AgreementTypesAttributesList
              // typeAttributes={typeAttributes as DocAttributeDto[]}
              // setTypeAttributes={setTypeAttributes}
              typeAttributesRef={typeAttributesRef}
              allAttributes={allAttributes}
            />
            <AgreementTypesBtnGroup
              onSave={() => {
                console.log('save');
              }}
              onCancel={() => {
                console.log('cancel');
              }}
            />
          </>
        </AgreementTypesAccordion>
        <Delete sx={{ cursor: 'pointer', color: '#1565c0' }} />
        <Divider />
      </Box>
    );
  },
);
