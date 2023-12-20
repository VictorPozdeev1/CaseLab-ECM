import { type FC } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Создан',
    description: `Иванов И.И`,
  },
  {
    label: `Отправлен
      на согласование`,
    description: `Григорьева А.А`,
  },
  {
    label: 'Получен ответ',
    description: `Григорьева А.А`,
  },
];

export const DocumentLifeCycle: FC = () => {
  const activeStep = 1;

  return (
    <Box sx={{ width: 144 }}>
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={index < activeStep}>
            <StepLabel>
              <Typography
                sx={{
                  color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '157%',
                  letterSpacing: '0.1px',
                }}
              >
                {step.label}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '166%',
                  letterSpacing: '0.4px',
                }}
              >
                {step.description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
