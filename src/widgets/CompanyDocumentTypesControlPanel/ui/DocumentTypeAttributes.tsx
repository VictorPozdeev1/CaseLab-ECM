import React, { type FC } from 'react';
import { Box, Checkbox, TextField, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { observer } from 'mobx-react-lite';

import { type DocumentAttribute } from '../model/DocumentAttribute';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  documentTypeAttributes: DocumentAttribute[] | undefined;
  onChange: (newList: DocumentAttribute[]) => void;
  allAttributes: DocumentAttribute[] | undefined;
}

export const DocumentTypeAttributes: FC<Props> = observer(
  ({ documentTypeAttributes, onChange, allAttributes }) => {
    const content =
      allAttributes == null && allAttributes === undefined ? (
        <Box>Нет атрибутов</Box>
      ) : (
        <Autocomplete
          fullWidth
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
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="Атрибуты"
                placeholder="Добавить атрибут"
              />
            );
          }}
          onChange={(_, newValue: DocumentAttribute[]) => {
            onChange(newValue);
          }}
        />
      );
    return <>{content}</>;
  },
);
