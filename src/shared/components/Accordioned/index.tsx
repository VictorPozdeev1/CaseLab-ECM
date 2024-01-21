import { type ReactNode, type FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Accordioned: FC<{
  children: ReactNode;
  detailsName: string;
}> = ({ children, detailsName }) => {
  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      elevation={0}
      // sx={{ backgroundColor: 'transparent' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Показать {detailsName}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
