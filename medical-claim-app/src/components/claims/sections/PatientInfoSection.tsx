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
    } else if (name.startsWith('patientAddress.')) {
      const field = name.split('.')[1] as keyof typeof formData.patientAddress;
      setFormData(prev => ({
        ...prev,
        patientAddress: {
          ...prev.patientAddress,
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
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Medicare ID"
            name="patientMedicareId"
            value={formData.patientMedicareId || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="First Name"
            name="patientName.firstName"
            value={formData.patientName.firstName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Last Name"
            name="patientName.lastName"
            value={formData.patientName.lastName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Middle Initial"
            name="patientName.middleInitial"
            value={formData.patientName.middleInitial || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Birth Date"
            name="patientBirthDate"
            type="date"
            value={formData.patientBirthDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
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
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Street Address"
            name="patientAddress.street"
            value={formData.patientAddress.street}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="City"
            name="patientAddress.city"
            value={formData.patientAddress.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="State"
            name="patientAddress.state"
            value={formData.patientAddress.state}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="patientAddress.zip"
            value={formData.patientAddress.zip}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Phone"
            name="patientAddress.phone"
            value={formData.patientAddress.phone || ''}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientInfoSection;
