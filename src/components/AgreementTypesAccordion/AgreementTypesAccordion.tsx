import { type FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  // TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { type DocAttributeDto } from '@api/generated';

interface PropType {
  // attributes: DocAttributeDto[] | undefined;
  children?: JSX.Element;
}

export const AgreementTypesAccordion: FC<PropType> = ({ children }) => {
  // const content = attributes?.map((attribute) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Показать Список атрибутов</Typography>
        {/* <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            //   value=
            defaultValue={attribute.name}
          /> */}
      </AccordionSummary>
      <AccordionDetails>
        {children}
        {/* <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography> */}
      </AccordionDetails>
    </Accordion>
  );
  // });

  // return <>{content}</>;
};
