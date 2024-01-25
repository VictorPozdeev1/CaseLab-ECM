import { useState, type FC } from 'react';
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

import type {
  DocumentType,
  CompanyDocumentTypesModel,
  DocumentTypeAttribute,
} from '../';
import { DocumentTypeAttributes } from './DocumentTypeAttributes';
import { DocTypeDto } from '@api';

const agreementTypes = [
  {
    title: 'Всеобщее согласование',
    value: 'EVERYONE',
    id: 1,
  },
  {
    title: 'Один согласующий',
    value: 'ANYONE',
    id: 2,
  },
  {
    title: 'Кворум (50%)',
    value: 'QUORUM',
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
  title?: string;
  onClose: () => void;
}

export const DocumentTypeForm: FC<DocumentTypeFormProps> = observer(
  ({ documentTypeId, model, title = 'Создать шаблон', onClose }) => {
    // make useEffect
    if (
      model.documentTypes?.state !== 'fulfilled' ||
      model.documentAttributes?.state !== 'fulfilled'
    ) {
      console.error(
        "model.documentTypes?.state !== 'fulfilled' on editClickHandler",
      );
      return <Alert>Данные не загружены</Alert>;
    }

    const documentTypeData =
      documentTypeId > 0
        ? (model.documentTypes.value.find(
            (dt) => dt.id === documentTypeId,
          ) as DocumentType)
        : null;

    // const nameRef = useRef<string>(documentTypeData.name);
    // const agreementTypeRef = useRef<string>(documentTypeData.agreementType);
    const [name, setName] = useState<string>(documentTypeData?.name ?? '');
    const [agreementType, setAgreementType] =
      useState<DocTypeDto.agreementType>(
        documentTypeData?.agreementType ?? DocTypeDto.agreementType.ANYONE,
      );
    // const selectedAttributesRef = useRef<DocumentTypeAttribute[]>(
    //   documentTypeData.attributes,
    // );
    const [selectedAttributes, setSelectedAttributes] = useState<
      DocumentTypeAttribute[]
    >(documentTypeData?.attributes ?? []);

    const performUpdateAsync = async (): Promise<void> => {
      await model.updateDocumentType(documentTypeId, {
        name,
        // agreementType, // В запросе на бэк нет этого поля, просить исправлять уже поздно
        attributeIds: selectedAttributes.map((a) => a.id),
      });
    };

    const performCreateAsync = async (): Promise<void> => {
      await model.createDocumentType({
        name,
        agreementType,
        attributeIds: selectedAttributes.map((a) => a.id),
      });
    };

    const performSubmitActionAsync =
      documentTypeId > 0 ? performUpdateAsync : performCreateAsync;

    return (
      <Dialog fullWidth open={true}>
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={5}>
            <Stack direction="row" spacing={3}>
              <TextField
                sx={{ flex: '1' }}
                label="Название"
                required
                variant="standard"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <FormControl variant="standard" sx={{ flex: '1' }}>
                <InputLabel id="demo-simple-select-standard-label" required>
                  Тип согласования
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={agreementType}
                  onChange={(e) => {
                    setAgreementType(
                      e.target.value as DocTypeDto.agreementType,
                    );
                  }}
                >
                  {menuItems}
                </Select>
              </FormControl>
            </Stack>
            <DocumentTypeAttributes
              documentTypeAttributes={selectedAttributes}
              allAttributes={model.documentAttributes.value}
              onChange={(newList) => {
                setSelectedAttributes(newList);
              }}
            />
          </Stack>
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
              performSubmitActionAsync()
                .then() /* Закрыть форму */
                .catch(() => {}) /* Оставить форму открытой и показать ошибку */
                .finally(); /* Разблокировать форму */
              onClose();
            }}
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);
