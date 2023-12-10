import { type FC, useEffect } from 'react';
import { Container } from '@mui/material';
import { docTypesStore } from '@store/index';
import { AgreementTypeElement } from '@components/AgreementTypeElement/AgreementTypeElement';
import { AgreementTypesAccordion } from '@components/AgreementTypesAccordion/AgreementTypesAccordion';
import { AgreementTypesAttributesList } from '@components/AgreementTypesAttributesList/AgreementTypesAttributesList';
import { observer } from 'mobx-react-lite';

export const AgreementsTypesPage: FC = observer(() => {
  useEffect(() => {
    void docTypesStore.getAllDocTypes();
  }, []);

  const content = docTypesStore.docTypes?.map((type) => {
    const typeAttributesId = type.attributes?.map((el) => el.id);
    console.log(typeAttributesId);
    return (
      <AgreementTypeElement type={type} key={type.id}>
        <AgreementTypesAccordion>
          <AgreementTypesAttributesList
            typeAttributesId={typeAttributesId as number[]}
          />
        </AgreementTypesAccordion>
      </AgreementTypeElement>
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
