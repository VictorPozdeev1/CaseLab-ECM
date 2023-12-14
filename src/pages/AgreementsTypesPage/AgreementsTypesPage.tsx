import { type FC, useEffect } from 'react';
import { Container } from '@mui/material';
import { attributesStore, docTypesStore } from '@store/index';
import { AgreementTypeElement } from '@components/AgreementTypeElement/AgreementTypeElement';
import { observer } from 'mobx-react-lite';

export const AgreementsTypesPage: FC = observer(() => {
  useEffect(() => {
    void docTypesStore.getAllDocTypes();
    void attributesStore.getAttributes();
  }, []);

  const content = docTypesStore.docTypes?.map((type) => {
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
        alignItems: 'center',
        gap: 'var(--none, 0px)',
        alignSelf: 'stretch',
        borderRadius: 'var(--none, 0px)',
      }}
    >
      {'Aggrement Page'}
      {content}
    </Container>
  );
});
