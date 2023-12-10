import { useEffect, type FC, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { type DocAttributeDto } from '@api/generated';
import { Box } from '@mui/material';
import { attributesStore } from '@store/index';
import { type DocAttributeDtoWithSelected } from '@api/generated/models/DocAttributeDtoWithSelected';
import { observer } from 'mobx-react-lite';
// import { toJS } from 'mobx';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface PropType {
  typeAttributesId: number[] | undefined;
}

export const AgreementTypesAttributesList: FC<PropType> = observer(
  ({ typeAttributesId }) => {
    console.log(typeAttributesId);
    const [attributes, setAttributes] = useState<
      DocAttributeDtoWithSelected[] | undefined
    >();

    useEffect(() => {
      void attributesStore.getAttributes().then(() => {
        setAttributes(
          attributesStore.attributes?.map((el) =>
            typeAttributesId?.includes(el.id as number) ?? false
              ? { ...el, selected: true }
              : { ...el, selected: false },
          ),
        );
      });
    }, []);
    const content =
      attributes == null && attributes === undefined ? (
        <Box>Нет атрибутов</Box>
      ) : (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={attributes}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name ?? 'name'}
          value={attributes.filter((el) => el.selected)}
          renderOption={(props, option) => (
            // <li {...props}>
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={option.selected}
              />
              {option.name}
              {/* <div style={{ fontSize: '8px' }}>{option.type}</div> */}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Атрибуты"
              placeholder="Добавить атрибут"
            />
          )}
        />
      );
    return <>{content}</>;
  },
);
