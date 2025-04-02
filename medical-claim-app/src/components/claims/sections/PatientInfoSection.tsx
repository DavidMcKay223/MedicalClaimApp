import React from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper, 
  Typography, 
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { CMS1500Claim } from '../../../types/claims';

interface PatientInfoSectionProps {
  formData: CMS1500Claim;
  setFormData: React.Dispatch<React.SetStateAction<CMS1500Claim>>;
}

const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('patientName.')) {
      const field = name.split('.')[1] as keyof typeof formData.patientName;
      setFormData(prev => ({
        ...prev,
        patientName: {
          ...prev.patientName,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name as keyof CMS1500Claim;
    const value = e.target.value as string;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Patient Information</Typography>
      <Grid container spacing={2}>
        {/* ... rest of the component remains the same ... */}
        <Grid size={{xs: 12, md: 4}}>
          <FormControl fullWidth required>
            <InputLabel>Sex</InputLabel>
            <Select
              name="patientSex"
              value={formData.patientSex}
              onChange={handleSelectChange}
              label="Sex"
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="U">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientInfoSection;
