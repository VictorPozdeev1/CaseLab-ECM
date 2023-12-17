import { type DocAttributeDto, type DocTypeDto } from '@api/generated';
import { Box, TextField } from '@mui/material';
import { type FC, useState, useRef, useEffect } from 'react';
import { Delete } from '@mui/icons-material';
import { AgreementTypesAccordion } from '@components/AgreementTypesAccordion/AgreementTypesAccordion';
import { AgreementTypesAttributesList } from '@components/AgreementTypesAttributesList/AgreementTypesAttributesList';
import { BtnsGroup } from '@components/BtnsGroup/BtnsGroup';
import { observer } from 'mobx-react-lite';
import FormControl from '@mui/material/FormControl';
import { docTypesStore } from '@store/index';
import { DeletePopup } from '@components/DeletePopup/DeletePopup';

interface PropType {
  key: number | undefined;
  type: DocTypeDto;
  allAttributes: DocAttributeDto[] | undefined;
}

export const AgreementTypeElement: FC<PropType> = observer(
  ({ type, allAttributes }) => {
    const [typeAttributes, setTypeAttributes] = useState<
      DocAttributeDto[] | undefined
    >(type?.attributes);
    const [isVisibleBtn, setIsVisibleBtn] = useState<boolean>(false);
    const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
    const PrevTypeValuesRef = useRef<{
      attributes: DocAttributeDto[] | undefined;
      docTitle: string;
    }>({
      attributes: [],
      docTitle: '',
    });
    const [typeDocTitle, setTypeDocTitle] = useState<string | undefined>(
      type.name,
    );
    useEffect(() => {
      PrevTypeValuesRef.current.attributes = typeAttributes;
      PrevTypeValuesRef.current.docTitle = typeDocTitle as string;
    }, []);

    const callbacks = {
      setAttributes: (newAttr: DocAttributeDto[]): void => {
        setTypeAttributes(newAttr);
        setIsVisibleBtn(true);
      },
      onSave: () => {
        //  отправка данных на сервер
        PrevTypeValuesRef.current.attributes = typeAttributes;
        PrevTypeValuesRef.current.docTitle = typeDocTitle as string;
        setIsVisibleBtn(false);
        void docTypesStore.updateDocType(
          type.id as number,
          typeDocTitle as string,
          typeAttributes as DocAttributeDto[],
        );
      },
      onCancel: () => {
        setTypeAttributes(PrevTypeValuesRef.current.attributes);
        setTypeDocTitle(PrevTypeValuesRef.current.docTitle);
        setIsVisibleBtn(false);
      },
    };

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
          border: '2px solid #f7f7f7',
          color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
          fontFeatureSettings: "'clig' off, 'liga' off",
          fontFamily: 'Roboto',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '133.4%',
        }}
      >
        <FormControl>
          <TextField
            placeholder="Наименование"
            fullWidth
            required
            label="Наименование"
            value={typeDocTitle}
            onChange={(e) => {
              setIsVisibleBtn(true);
              setTypeDocTitle(() => e.target.value);
            }}
            // defaultValue={type.name}
            multiline
            sx={{
              minWidth: '300px',
              marginBottom: '10px',
            }}
          />
          {/* <CustomFormControl /> */}
          {/* <TextField
            multiline
            fullWidth
            placeholder="тип"
            label="тип"
            value={type.agreementType}
            required
          /> */}
        </FormControl>
        <Box>
          <AgreementTypesAccordion>
            <AgreementTypesAttributesList
              typeAttributes={typeAttributes as DocAttributeDto[]}
              setTypeAttributes={callbacks.setAttributes}
              allAttributes={allAttributes}
            />
          </AgreementTypesAccordion>
          <BtnsGroup
            onSave={callbacks.onSave}
            onCancel={callbacks.onCancel}
            isVisible={isVisibleBtn}
          />
        </Box>
        <DeletePopup
          isOpen={isOpenDeletePopup}
          onSubmit={() => {
            console.log('submit');
            void docTypesStore.deleteDocTypeById(type?.id as number);
          }}
          onClose={() => {
            setIsOpenDeletePopup(false);
          }}
          onCancel={() => {
            setIsOpenDeletePopup(false);
          }}
        />
        <Delete
          sx={{ cursor: 'pointer', color: '#1565c0' }}
          onClick={() => {
            setIsOpenDeletePopup(true);
          }}
        />
      </Box>
    );
  },
);
