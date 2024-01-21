import React, { type FC } from 'react';
import { Box, Checkbox, TextField, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { observer } from 'mobx-react-lite';

import { type DocAttributeDto } from '@api';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  documentTypeAttributes: DocAttributeDto[] | undefined;
  setTypeAttributes: (newAttr: DocAttributeDto[]) => void;
  allAttributes: DocAttributeDto[] | undefined;
}

export const DocumentTypesAttributesList: FC<Props> = observer(
  ({ documentTypeAttributes, setTypeAttributes, allAttributes }) => {
    // console.log(typeAttributes);

    const content =
      allAttributes == null && allAttributes === undefined ? (
        <Box>Нет атрибутов</Box>
      ) : (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={allAttributes}
          disableCloseOnSelect
          value={documentTypeAttributes}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => (
            <React.Fragment key={option.id}>
              <li {...props}>
                <Checkbox
                  icon={icon}
                  key={`Checkbox${option.id}`}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={documentTypeAttributes?.some(
                    (attr) => attr.id === option.id,
                  )}
                />
                {option.name}
              </li>
              <div
                style={{ fontSize: '10px', marginLeft: '25px' }}
                key={`Checkbox${option.id}`}
              >
                {option.type}
              </div>
            </React.Fragment>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Атрибуты"
              placeholder="Добавить атрибут"
            />
          )}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: DocAttributeDto[],
          ) => {
            setTypeAttributes(newValue);
            // console.log(newValue);
            // typeAttributesRef.current = newValue.map((el) => el.id) as number[];
          }}
        />
      );
    return <>{content}</>;
  },
);
