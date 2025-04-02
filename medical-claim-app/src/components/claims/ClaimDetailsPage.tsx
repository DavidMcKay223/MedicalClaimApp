import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import ClaimHeader from './sections/ClaimHeader';
import PatientInfoSection from './sections/PatientInfoSection';
import DiagnosisSection from './sections/DiagnosisSection';
import ServicesSection from './sections/ServicesSection';
import BillingProviderSection from './sections/BillingProviderSection';
import { Claim, CMS1500Claim } from '../../types/claims';

const ClaimDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<Claim>(id ?
    getMockClaim() :
    getEmptyClaim()
  );

  // Create a CMS1500-specific setter function
  const setCMS1500FormData = (update: React.SetStateAction<CMS1500Claim>) => {
    setFormData(prev => {
      // Ensure we're working with a CMS1500Claim
      const current = prev as CMS1500Claim;
      const updated = typeof update === 'function'
        ? update(current)
        : update;
      return updated;
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/claims');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {id ? 'Edit Claim' : 'Create New Claim'}
        </Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate('/claims')}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {id ? 'Update Claim' : 'Create Claim'}
          </Button>
        </Box>
      </Box>

      <ClaimHeader
        formData={formData}
        setFormData={setFormData}
      />

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Form Details" />
        <Tab label="Attachments" />
        <Tab label="History" />
      </Tabs>

      {formData.formType === 'CMS1500' && (
        <>
          <PatientInfoSection
            formData={formData as CMS1500Claim}
            setFormData={setCMS1500FormData}
          />

          <DiagnosisSection
            formData={formData as CMS1500Claim}
            setFormData={setCMS1500FormData}
          />

          <ServicesSection
            formData={formData as CMS1500Claim}
            setFormData={setCMS1500FormData}
          />

          <BillingProviderSection
            formData={formData as CMS1500Claim}
            setFormData={setCMS1500FormData}
          />
        </>
      )}
      {/* Add similar UB04 form sections here when implemented */}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate('/claims')}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {id ? 'Update Claim' : 'Create Claim'}
        </Button>
      </Box>
    </Container>
  );
};

// Helper functions for initial state
function getMockClaim(): CMS1500Claim {
  return {
    id: '1',
    claimNumber: 'HC001',
    formType: 'CMS1500',
    status: 'draft',
    dateCreated: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    providerId: 'prov123',
    patientId: 'pat456',
    patientName: {
      firstName: 'John',
      lastName: 'Doe',
      middleInitial: 'A'
    },
    patientBirthDate: '1980-01-15',
    patientSex: 'M',
    patientAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '90210'
    },
    diagnosisCodes: ['E11.65'],
    services: [
      {
        dateFrom: '2023-01-01',
        dateTo: '2023-01-01',
        placeOfService: '11',
        procedureCode: '99213',
        units: 1,
        diagnosisPointers: ['A'],
        charges: 125.00
      }
    ],
    totalCharge: 125.00,
    billingProvider: {
      name: 'Healthcare Provider Inc.',
      address: {
        street: '456 Clinic Ave',
        city: 'Medical City',
        state: 'CA',
        zip: '90211'
      },
      npi: '1234567890'
    }
  };
}

function getEmptyClaim(): CMS1500Claim {
  return {
    id: '',
    claimNumber: '',
    formType: 'CMS1500',
    status: 'draft',
    dateCreated: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    providerId: '',
    patientId: '',
    patientName: {
      firstName: '',
      lastName: ''
    },
    patientBirthDate: '',
    patientSex: 'M',
    patientAddress: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    diagnosisCodes: [],
    services: [],
    totalCharge: 0,
    billingProvider: {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      npi: ''
    }
  };
}

export default ClaimDetailsPage;
