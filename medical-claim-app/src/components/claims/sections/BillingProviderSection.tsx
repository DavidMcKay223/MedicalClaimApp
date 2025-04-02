import React from 'react';
import { 
  TextField, 
  Paper, 
  Typography, 
  Grid 
} from '@mui/material';
import { CMS1500Claim } from '../../../types/claims';

interface BillingProviderSectionProps {
  formData: CMS1500Claim;
  setFormData: React.Dispatch<React.SetStateAction<CMS1500Claim>>;
}

const BillingProviderSection: React.FC<BillingProviderSectionProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('billingProvider.address.')) {
      const field = name.split('.').slice(2).join('.') as keyof typeof formData.billingProvider.address;
      setFormData(prev => ({
        ...prev,
        billingProvider: {
          ...prev.billingProvider,
          address: {
            ...prev.billingProvider.address,
            [field]: value
          }
        }
      }));
    } else if (name.startsWith('billingProvider.')) {
      const field = name.split('.')[1] as keyof typeof formData.billingProvider;
      setFormData(prev => ({
        ...prev,
        billingProvider: {
          ...prev.billingProvider,
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

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Billing Provider</Typography>
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Provider Name"
            name="billingProvider.name"
            value={formData.billingProvider.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="NPI"
            name="billingProvider.npi"
            value={formData.billingProvider.npi}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{xs: 12}}>
          <TextField
            fullWidth
            label="Street Address"
            name="billingProvider.address.street"
            value={formData.billingProvider.address.street}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <TextField
            fullWidth
            label="City"
            name="billingProvider.address.city"
            value={formData.billingProvider.address.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <TextField
            fullWidth
            label="State"
            name="billingProvider.address.state"
            value={formData.billingProvider.address.state}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="billingProvider.address.zip"
            value={formData.billingProvider.address.zip}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BillingProviderSection;
