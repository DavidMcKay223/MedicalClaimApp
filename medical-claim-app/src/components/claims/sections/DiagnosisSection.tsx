import React from 'react';
import { Paper, Typography, Autocomplete, TextField } from '@mui/material';
import { CMS1500Claim } from '../../../types/claims';

const diagnosisCodes = [
  { value: 'E11.65', label: 'Type 2 diabetes mellitus with hyperglycemia' },
  { value: 'J18.9', label: 'Pneumonia, unspecified' },
];

interface DiagnosisSectionProps {
  formData: CMS1500Claim;
  setFormData: React.Dispatch<React.SetStateAction<CMS1500Claim>>;
}

const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ formData, setFormData }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Diagnosis Codes</Typography>
      <Autocomplete
        multiple
        options={diagnosisCodes}
        getOptionLabel={(option) => `${option.value} - ${option.label}`}
        value={formData.diagnosisCodes.map(code =>
          diagnosisCodes.find(dc => dc.value === code) || { value: code, label: code }
        )}
        onChange={(event, newValue) => {
          setFormData(prev => ({
            ...prev,
            diagnosisCodes: newValue.map(item => item.value)
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Diagnosis Codes"
            placeholder="Add ICD-10 codes"
          />
        )}
      />
    </Paper>
  );
};

export default DiagnosisSection;
