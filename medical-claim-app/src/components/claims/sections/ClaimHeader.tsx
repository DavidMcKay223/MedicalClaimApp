import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Paper, Grid, SelectChangeEvent } from '@mui/material';
import { Claim } from '../../../types/claims';

interface ClaimHeaderProps {
  formData: Claim;
  setFormData: React.Dispatch<React.SetStateAction<Claim>>;
}

const ClaimHeader: React.FC<ClaimHeaderProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name as keyof Claim;
    const value = e.target.value as string;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 4}}>
          <TextField
            fullWidth
            label="Claim Number"
            name="claimNumber"
            value={formData.claimNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <FormControl fullWidth required>
            <InputLabel>Form Type</InputLabel>
            <Select
              name="formType"
              value={formData.formType}
              onChange={handleSelectChange}
              label="Form Type"
            >
              <MenuItem value="CMS1500">CMS-1500</MenuItem>
              <MenuItem value="UB04">UB-04</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              label="Status"
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="submitted">Submitted</MenuItem>
              <MenuItem value="processed">Processed</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClaimHeader;
