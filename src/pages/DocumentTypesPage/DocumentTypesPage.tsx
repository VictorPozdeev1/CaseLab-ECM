import { type FC, useEffect, useState } from 'react';
import { Container, Fab } from '@mui/material';
import { attributesStore, docTypesStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { type DocTypeCreateDto } from '@api';
import { DocumentTypesElement } from '@widgets/DocumentTypesWidget/components/DocumentTypesElement/DocumentTypesElement';
import { DocumentTypesPopup } from '@widgets/DocumentTypesWidget/components/DocumentTypesPopup/DocumentTypesPopup';
import { BtnsGroup } from '@widgets/DocumentTypesWidget/components/BtnsGroup/BtnsGroup';

export type agreementType = 'EVERYONE' | 'ANYONE' | 'QORUUM';

export const DocumentTypesPage: FC = observer(() => {
  useEffect(() => {
    void docTypesStore.loadAllDocTypes();
    void attributesStore.loadAllAttributes();
  }, []);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [newTypeValue, setNewTypeValue] = useState<DocTypeCreateDto>({
    agreementType: 'EVERYONE',
    name: '',
  });

  const AgreementTypeElements = docTypesStore.docTypes?.map((type) => {
    return (
      <DocumentTypesElement
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
        <DocumentTypesPopup
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
              void docTypesStore.createDocType({
                name: newTypeValue.name,
                agreementType: newTypeValue.agreementType,
              });
              setIsOpenPopup(false);
            }}
          />
        </DocumentTypesPopup>

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
