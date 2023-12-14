import { useState, type FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { type DocAttributeDto } from '@api/generated';
import { Box } from '@mui/material';
// import { type DocAttributeDtoWithSelected } from '@api/generated/models/DocAttributeDtoWithSelected';
import { observer } from 'mobx-react-lite';
import { type DocAttributeDto } from '@api/generated';
// import { toJS } from 'mobx';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// interface PropType {
//   typeAttributesId: number[] | undefined;
// }
// interface PropType {
//   typeAttributes: DocAttributeDto[] | undefined;
//   setTypeAttributes: React.Dispatch<
//     React.SetStateAction<DocAttributeDto[] | undefined>
//   >;
//   allAttributes: DocAttributeDto[] | undefined;
// }

interface PropType {
  // typeAttributes: DocAttributeDto[] | undefined;
  // setTypeAttributes: React.Dispatch<
  //   React.SetStateAction<DocAttributeDto[] | undefined>
  // >;
  typeAttributesRef: React.MutableRefObject<number[] | undefined>;
  allAttributes: DocAttributeDto[] | undefined;
}

export const AgreementTypesAttributesList: FC<PropType> = observer(
  // ({ typeAttributes, setTypeAttributes, allAttributes }) => {
  ({ typeAttributesRef, allAttributes }) => {
    const [typeAttributes, setTypeAttributes] = useState<
      DocAttributeDto[] | undefined
    >(
      allAttributes?.filter(
        (el) => typeAttributesRef?.current?.includes(el.id as number),
      ),
    );

    // useEffect(() => {
    //   setTypeAttributes(
    //     allAttributes?.filter(
    //       (el) => typeAttributesRef?.current?.includes(el.id as number),
    //     ),
    //   );
    // }, []);

    // allAttributes?.forEach((el) => {
    //   console.log(toJS(el));
    // });

    console.log(typeAttributes);

    const content =
      allAttributes == null && allAttributes === undefined ? (
        <Box>Нет атрибутов</Box>
      ) : (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={allAttributes}
          disableCloseOnSelect
          value={typeAttributes}
          getOptionLabel={(option) => option.name as string}
          renderOption={(props, option) => (
            <>
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  key={option.id}
                  checked={typeAttributes?.some(
                    (attr) => attr.id === option.id,
                  )}
                  // checked={typeAttributes
                  //   ?.map((el) => el.id)
                  //   .includes(option.id)}
                />
                {option.name}
              </li>
              <div style={{ fontSize: '10px', marginLeft: '25px' }}>
                {option.type}
              </div>
            </>
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
            setTypeAttributes(() => newValue);
            console.log(newValue);
            typeAttributesRef.current = newValue.map((el) => el.id) as number[];
          }}
        />
      );
    // console.log(toJS(typeAttributesRef.current));
    return <>{content}</>;
  },
);
