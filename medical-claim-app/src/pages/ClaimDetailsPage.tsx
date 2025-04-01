import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Paper,
    Divider,
    Chip,
    Tabs,
    Tab,
    Autocomplete,
    SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import { Claim, CMS1500Claim, UB04Claim, Service } from '../types/claims';

// Mock data for select options
const placeOfServiceCodes = [
    { value: '11', label: 'Office' },
    { value: '21', label: 'Inpatient Hospital' },
];

const diagnosisCodes = [
    { value: 'E11.65', label: 'Type 2 diabetes mellitus with hyperglycemia' },
    { value: 'J18.9', label: 'Pneumonia, unspecified' },
];

const revenueCodes = [
    { value: '0250', label: 'Pharmacy' },
    { value: '0300', label: 'Laboratory' },
];

const ClaimDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(!id);
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState<Claim>(id ?
        {
            id: '1',
            claimNumber: 'HC001',
            formType: 'CMS1500',
            status: 'draft',
            dateCreated: new Date().toISOString().split('T')[0],
            dateModified: new Date().toISOString().split('T')[0],
            providerId: 'prov123',
            patientId: 'pat456',
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
        } as CMS1500Claim :
        {
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
        } as CMS1500Claim
    );

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => {
            if (formData.formType === 'CMS1500') {
                const cmsData = prev as CMS1500Claim;
                if (name.startsWith('patientName.')) {
                    const field = name.split('.')[1] as keyof typeof cmsData.patientName;
                    return {
                        ...cmsData,
                        patientName: {
                            ...cmsData.patientName,
                            [field]: value
                        }
                    } as Claim;
                }
                if (name.startsWith('billingProvider.address.')) {
                    const field = name.split('.').slice(1).join('.') as keyof typeof cmsData.billingProvider.address;
                    return {
                        ...cmsData,
                        billingProvider: {
                            ...cmsData.billingProvider,
                            address: {
                                ...cmsData.billingProvider.address,
                                [field]: value
                            }
                        }
                    } as Claim;
                }
                return {
                    ...cmsData,
                    [name]: type === 'checkbox' ? checked : value
                } as Claim;
            } else {
                const ub04Data = prev as UB04Claim;
                return {
                    ...ub04Data,
                    [name]: type === 'checkbox' ? checked : value
                } as Claim;
            }
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceChange = (index: number, field: keyof Service, value: any) => {
        if (formData.formType === 'CMS1500') {
            setFormData(prev => {
                const cmsData = prev as CMS1500Claim;
                const newServices = [...cmsData.services];
                newServices[index] = {
                    ...newServices[index],
                    [field]: value
                };
                return {
                    ...cmsData,
                    services: newServices
                } as Claim;
            });
        }
    };

    const addService = () => {
        if (formData.formType === 'CMS1500') {
            setFormData(prev => {
                const cmsData = prev as CMS1500Claim;
                return {
                    ...cmsData,
                    services: [
                        ...cmsData.services,
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
                } as Claim;
            });
        }
    };

    const removeService = (index: number) => {
        if (formData.formType === 'CMS1500') {
            setFormData(prev => {
                const cmsData = prev as CMS1500Claim;
                const newServices = [...cmsData.services];
                newServices.splice(index, 1);
                return {
                    ...cmsData,
                    services: newServices
                } as Claim;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/claims');
    };

    const renderCMS1500Form = () => (
        <Grid container spacing={2}>
            {/* Patient Information */}
            <Grid size={{xs: 12}}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Patient Information</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="patientName.firstName"
                                value={(formData as CMS1500Claim).patientName.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="patientName.lastName"
                                value={(formData as CMS1500Claim).patientName.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="Middle Initial"
                                name="patientName.middleInitial"
                                value={(formData as CMS1500Claim).patientName.middleInitial || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="Birth Date"
                                type="date"
                                name="patientBirthDate"
                                value={(formData as CMS1500Claim).patientBirthDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <FormControl fullWidth required>
                                <InputLabel>Sex</InputLabel>
                                <Select
                                    name="patientSex"
                                    value={(formData as CMS1500Claim).patientSex}
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
            </Grid>

            {/* Diagnosis Codes */}
            <Grid size={{xs: 12}}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Diagnosis Codes</Typography>
                    <Autocomplete
                        multiple
                        options={diagnosisCodes}
                        getOptionLabel={(option) => `${option.value} - ${option.label}`}
                        value={(formData as CMS1500Claim).diagnosisCodes.map(code =>
                            diagnosisCodes.find(dc => dc.value === code) || { value: code, label: code }
                        )}
                        onChange={(event, newValue) => {
                            setFormData(prev => ({
                                ...(prev as CMS1500Claim),
                                diagnosisCodes: newValue.map(item => item.value)
                            } as Claim));
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
            </Grid>

            {/* Services */}
            <Grid size={{xs: 12}}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Services</Typography>
                        <Button variant="contained" onClick={addService}>Add Service</Button>
                    </Box>

                    {(formData as CMS1500Claim).services.map((service, index) => (
                        <Box key={index} mb={3} p={2} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, md: 3}}>
                                    <TextField
                                        fullWidth
                                        label="Date From"
                                        type="date"
                                        value={service.dateFrom}
                                        onChange={(e) => handleServiceChange(index, 'dateFrom', e.target.value)}
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
                                        onChange={(e) => handleServiceChange(index, 'dateTo', e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 3}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Place of Service</InputLabel>
                                        <Select
                                            value={service.placeOfService}
                                            onChange={(e) => handleServiceChange(index, 'placeOfService', e.target.value)}
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
                                        onChange={(e) => handleServiceChange(index, 'procedureCode', e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 3}}>
                                    <TextField
                                        fullWidth
                                        label="Units"
                                        type="number"
                                        value={service.units}
                                        onChange={(e) => handleServiceChange(index, 'units', parseInt(e.target.value))}
                                        required
                                    />
                                </Grid>
                                 <Grid size={{xs: 12, md: 3}}>
                                    <TextField
                                        fullWidth
                                        label="Charges ($)"
                                        type="number"
                                        value={service.charges}
                                        onChange={(e) => handleServiceChange(index, 'charges', parseFloat(e.target.value))}
                                        required
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 3}}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeService(index)}
                                    >
                                        Remove Service
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Paper>
            </Grid>

            {/* Billing Provider */}
            <Grid size={{xs: 12}}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Billing Provider</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                fullWidth
                                label="Provider Name"
                                name="billingProvider.name"
                                value={(formData as CMS1500Claim).billingProvider.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                fullWidth
                                label="NPI"
                                name="billingProvider.npi"
                                value={(formData as CMS1500Claim).billingProvider.npi}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <TextField
                                fullWidth
                                label="Street Address"
                                name="billingProvider.address.street"
                                value={(formData as CMS1500Claim).billingProvider.address.street}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="City"
                                name="billingProvider.address.city"
                                value={(formData as CMS1500Claim).billingProvider.address.city}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="State"
                                name="billingProvider.address.state"
                                value={(formData as CMS1500Claim).billingProvider.address.state}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <TextField
                                fullWidth
                                label="ZIP Code"
                                name="billingProvider.address.zip"
                                value={(formData as CMS1500Claim).billingProvider.address.zip}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );

    const renderUB04Form = () => (
        <Grid container spacing={3}>
            <Grid size={{xs: 12}}>
                <Typography variant="h6">UB04 Form Fields</Typography>
                <Typography color="textSecondary">
                    Implementation would follow similar pattern as CMS1500 but with UB04 specific fields
                </Typography>
            </Grid>
        </Grid>
    );

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

            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Form Details" />
                <Tab label="Attachments" />
                <Tab label="History" />
            </Tabs>

            {formData.formType === 'CMS1500' ? renderCMS1500Form() : renderUB04Form()}

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

export default ClaimDetailsPage;
