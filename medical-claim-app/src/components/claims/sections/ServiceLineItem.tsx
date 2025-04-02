import React from 'react';
import { 
  Box, 
  Grid, 
  Button, 
  FormControl, 
  InputLabel,
  TextField,
  Select, 
  MenuItem 
} from '@mui/material';
import { Service } from '../../../types/claims';

const placeOfServiceCodes = [
  { value: '11', label: 'Office' },
  { value: '21', label: 'Inpatient Hospital' },
];

interface ServiceLineItemProps {
  index: number;
  service: Service;
  onServiceChange: (index: number, field: keyof Service, value: any) => void;
  onRemoveService: (index: number) => void;
}

const ServiceLineItem: React.FC<ServiceLineItemProps> = ({ 
  index, 
  service, 
  onServiceChange, 
  onRemoveService 
}) => {
  return (
    <Box mb={3} p={2} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 3}}>
          <TextField
            fullWidth
            label="Date From"
            type="date"
            value={service.dateFrom}
            onChange={(e) => onServiceChange(index, 'dateFrom', e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 3}}>
          <TextField
            fullWidth
            label="Date To"
            type="date"
            value={service.dateTo}
            onChange={(e) => onServiceChange(index, 'dateTo', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{xs: 12, md: 3}}>
          <FormControl fullWidth>
            <InputLabel>Place of Service</InputLabel>
            <Select
              value={service.placeOfService}
              onChange={(e) => onServiceChange(index, 'placeOfService', e.target.value)}
              label="Place of Service"
              required
            >
              {placeOfServiceCodes.map(pos => (
                <MenuItem key={pos.value} value={pos.value}>{pos.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs: 12, md: 3}}>
          <TextField
            fullWidth
            label="Procedure Code"
            value={service.procedureCode}
            onChange={(e) => onServiceChange(index, 'procedureCode', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 3}}>
          <TextField
            fullWidth
            label="Units"
            type="number"
            value={service.units}
            onChange={(e) => onServiceChange(index, 'units', parseInt(e.target.value))}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 3}}>
          <TextField
            fullWidth
            label="Charges ($)"
            type="number"
            value={service.charges}
            onChange={(e) => onServiceChange(index, 'charges', parseFloat(e.target.value))}
            required
          />
        </Grid>
        <Grid size={{xs: 12, md: 3}}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onRemoveService(index)}
          >
            Remove Service
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceLineItem;
