import React, { useState, ChangeEvent } from 'react';
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
    SelectChangeEvent, // Import SelectChangeEvent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ClaimFormData {
    claimNumber: string;
    firstName: string;
    lastName: string;
    dateCreated: string;
    formType: 'CMS1500' | 'UB04' | string;
    // Add more fields based on your form requirements
}

const ClaimDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ClaimFormData>({
        claimNumber: '',
        firstName: '',
        lastName: '',
        dateCreated: '',
        formType: 'CMS1500',
        // Initialize other fields
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value as string }); // Type assertion for value
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        navigate('/claims');
    };

    const handleCancel = () => {
        navigate('/claims');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Create New Claim
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* ... TextField components ... */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="form-type-label">Form Type</InputLabel>
                    <Select
                        labelId="form-type-label"
                        id="formType"
                        name="formType"
                        value={formData.formType}
                        onChange={handleChange} // Now handles SelectChangeEvent as well
                        label="Form Type"
                    >
                        <MenuItem value="CMS1500">CMS1500</MenuItem>
                        <MenuItem value="UB04">UB04</MenuItem>
                        {/* Add more form type options */}
                    </Select>
                </FormControl>
                {/* ... rest of your form */}
            </form>
        </Container>
    );
};

export default ClaimDetailsPage;