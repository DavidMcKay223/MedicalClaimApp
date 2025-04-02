import React from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import ServiceLineItem from './ServiceLineItem';
import { CMS1500Claim, Service } from '../../../types/claims';

interface ServicesSectionProps {
  formData: CMS1500Claim;
  setFormData: React.Dispatch<React.SetStateAction<CMS1500Claim>>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ formData, setFormData }) => {
  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          dateFrom: '',
          dateTo: '',
          placeOfService: '',
          procedureCode: '',
          units: 1,
          diagnosisPointers: [],
          charges: 0
        }
      ]
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => {
      const newServices = [...prev.services];
      newServices.splice(index, 1);
      return {
        ...prev,
        services: newServices
      };
    });
  };

  const handleServiceChange = (index: number, field: keyof Service, value: any) => {
    setFormData(prev => {
      const newServices = [...prev.services];
      newServices[index] = {
        ...newServices[index],
        [field]: value
      };
      return {
        ...prev,
        services: newServices
      };
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Services</Typography>
        <Button variant="contained" onClick={addService}>Add Service</Button>
      </Box>

      {formData.services.map((service, index) => (
        <ServiceLineItem
          key={index}
          index={index}
          service={service}
          onServiceChange={handleServiceChange}
          onRemoveService={removeService}
        />
      ))}
    </Paper>
  );
};

export default ServicesSection;
