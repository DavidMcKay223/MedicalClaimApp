import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Button,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Claim } from '../types/claims';

interface ClaimPageProps {
    relatedObjectType?: string;
    relatedObjectId?: string | number;
}

const ClaimPage: React.FC<ClaimPageProps> = ({ relatedObjectType, relatedObjectId }) => {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Simulate fetching data with our new types
        setTimeout(() => {
            const hardcodedClaims: Claim[] = [
                {
                    id: '1',
                    claimNumber: 'HC001',
                    formType: 'CMS1500',
                    status: 'submitted',
                    dateCreated: '2025-03-25',
                    dateModified: '2025-03-25',
                    providerId: 'prov123',
                    patientId: 'pat456',
                    patientName: {
                        firstName: 'Alice',
                        lastName: 'Smith'
                    },
                    patientBirthDate: '1980-05-15',
                    patientSex: 'F',
                    patientAddress: {
                        street: '123 Main St',
                        city: 'Anytown',
                        state: 'CA',
                        zip: '90210'
                    },
                    diagnosisCodes: ['E11.65'],
                    services: [{
                        dateFrom: '2025-03-20',
                        dateTo: '2025-03-20',
                        placeOfService: '11',
                        procedureCode: '99213',
                        units: 1,
                        diagnosisPointers: ['1'],
                        charges: 125.00
                    }],
                    totalCharge: 125.00,
                    billingProvider: {
                        name: 'City Medical Group',
                        address: {
                            street: '456 Clinic Ave',
                            city: 'Anytown',
                            state: 'CA',
                            zip: '90210'
                        },
                        npi: '1234567890'
                    }
                },
                {
                    id: '2',
                    claimNumber: 'UB022',
                    formType: 'UB04',
                    status: 'processed',
                    dateCreated: '2025-03-20',
                    dateModified: '2025-03-22',
                    providerId: 'prov123',
                    patientId: 'pat789',
                    patientControlNumber: 'PT789012',
                    provider: {
                        name: 'City Hospital',
                        address: {
                            street: '789 Hospital Way',
                            city: 'Anytown',
                            state: 'CA',
                            zip: '90210'
                        },
                        phone: '555-123-4567',
                        npi: '9876543210',
                        taxId: '12-3456789'
                    },
                    patientAddress: {
                        street: '456 Oak St',
                        city: 'Anytown',
                        state: 'CA',
                        zip: '90210'
                    },
                    typeOfBill: '111',
                    icdVersion: 'ICD-10',
                    principalDiagnosis: 'J18.9',
                    revenueCodes: [{
                        code: '0250',
                        description: 'Pharmacy',
                        units: 1,
                        totalCharge: 85.50
                    }],
                    payers: [{
                        name: 'Medicare',
                        releaseOfInfo: true,
                        assignmentOfBenefits: true
                    }]
                }
            ];

            setClaims(hardcodedClaims);
            setLoading(false);
        }, 1000);
    }, [relatedObjectType, relatedObjectId]);

    const handleCreateNewClaim = () => {
        navigate('/claims/new');
    };

    const handleRowDoubleClick = (claimId: string) => {
        navigate(`/claims/${claimId}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'info';
            case 'processed': return 'success';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Claims
                </Typography>
                <Button variant="contained" color="primary" onClick={handleCreateNewClaim}>
                    Create New Claim
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="claims table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Claim #</TableCell>
                                <TableCell>Patient Name</TableCell>
                                <TableCell>Form Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date Created</TableCell>
                                <TableCell>Total Charge</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {claims.map((claim) => (
                                <TableRow
                                    key={claim.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    onDoubleClick={() => handleRowDoubleClick(claim.id)}
                                    hover
                                >
                                    <TableCell>{claim.claimNumber}</TableCell>
                                    <TableCell>
                                        {claim.formType === 'CMS1500' 
                                            ? `${claim.patientName.lastName}, ${claim.patientName.firstName}`
                                            : claim.formType === 'UB04'
                                            ? `${claim.patientAddress.street}` // UB04 stores address differently
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{claim.formType}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={claim.status} 
                                            color={getStatusColor(claim.status)} 
                                            size="small" 
                                        />
                                    </TableCell>
                                    <TableCell>{claim.dateCreated}</TableCell>
                                    <TableCell>
                                        {claim.formType === 'CMS1500' 
                                            ? `$${claim.totalCharge.toFixed(2)}`
                                            : claim.formType === 'UB04'
                                            ? `$${claim.revenueCodes.reduce((sum, item) => sum + item.totalCharge, 0).toFixed(2)}`
                                            : 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ClaimPage;
