import { type FC, useEffect, useState } from 'react';
import { Container, Fab } from '@mui/material';
import { attributesStore, docTypesStore } from '@store/index';
import { AgreementTypeElement } from '@components/AgreementTypeElement/AgreementTypeElement';
import { observer } from 'mobx-react-lite';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { AgreementTypePopup } from '@components/AgreementTypePopup/AgreementTypePopup';
import { BtnsGroup } from '@components/BtnsGroup/BtnsGroup';
import { type DocTypeCreateDto } from '@api/generated';

export type agreementType = 'EVERYONE' | 'ANYONE' | 'QORUUM';

export const AgreementsTypesPage: FC = observer(() => {
  useEffect(() => {
    void docTypesStore.getAllDocTypes();
    void attributesStore.getAttributes();
  }, []);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [newTypeValue, setNewTypeValue] = useState<DocTypeCreateDto>({
    agreementType: 'EVERYONE',
    name: '',
  });

  const AgreementTypeElements = docTypesStore.docTypes?.map((type) => {
    return (
      <AgreementTypeElement
        key={type.id}
        type={type}
        allAttributes={attributesStore.attributes}
      />
    );
  });

  return (
    <Container
      sx={{
        display: 'flex',
        maxWidth: 'var(--breakpoints-laptop, 992px)',
        padding: 'var(--paddings-pad-3, 24px) var(--none, 0px)',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '2px solid #f7f7f7',
        marginTop: '20px',
        alignItems: 'center',
        gap: 'var(--none, 0px)',
        alignSelf: 'stretch',
        borderRadius: 'var(--none, 0px)',
      }}
    >
      <Container>
        <AgreementTypePopup
          isOpen={isOpenPopup}
          onClose={() => {
            setIsOpenPopup(false);
          }}
          newTypeValue={newTypeValue}
          setNewTypeValue={setNewTypeValue}
        >
          <BtnsGroup
            isVisible={true}
            onCancel={() => {
              setIsOpenPopup(false);
            }}
            onSave={() => {
              console.log(newTypeValue);
              void docTypesStore.createDocType({
                name: newTypeValue.name,
                agreementType: newTypeValue.agreementType,
              });
              setIsOpenPopup(false);
            }}
          />
        </AgreementTypePopup>

        <Fab
          color="primary"
          variant="extended"
          onClick={() => {
            setIsOpenPopup(true);
          }}
        >
          <AddRoundedIcon fontSize="medium" />
          Создать
        </Fab>
      </Container>
      {AgreementTypeElements}
    </Container>
  );
});
