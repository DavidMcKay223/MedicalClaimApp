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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ClaimData {
    claimNumber: string;
    firstName: string;
    lastName: string;
    dateCreated: string;
    formType: 'CMS1500' | 'UB04' | string;
    // Add other common claim data fields here
}

interface ClaimPageProps {
    relatedObjectType?: string;
    relatedObjectId?: string | number;
}

const ClaimPage: React.FC<ClaimPageProps> = ({ relatedObjectType, relatedObjectId }) => {
    const [claims, setClaims] = useState<ClaimData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Simulate fetching data (replace with your actual API call later)
        setTimeout(() => {
            const hardcodedClaims: ClaimData[] = [
                { claimNumber: 'HC001', firstName: 'Alice', lastName: 'Smith', dateCreated: '2025-03-25', formType: 'CMS1500' },
                { claimNumber: 'UB022', firstName: 'Bob', lastName: 'Johnson', dateCreated: '2025-03-20', formType: 'UB04' },
                { claimNumber: 'HC002', firstName: 'Charlie', lastName: 'Brown', dateCreated: '2025-03-15', formType: 'CMS1500' },
                { claimNumber: 'UB023', firstName: 'Diana', lastName: 'Garcia', dateCreated: '2025-03-10', formType: 'UB04' },
                { claimNumber: 'HC003', firstName: 'Eve', lastName: 'Miller', dateCreated: '2025-03-05', formType: 'CMS1500' },
            ];

            // Filter based on relatedObjectType and relatedObjectId if provided
            let filteredClaims = hardcodedClaims;
            if (relatedObjectType && relatedObjectId) {
                // Implement your filtering logic here if needed
            }

            setClaims(filteredClaims);
            setLoading(false);
        }, 1000); // Simulate a 1-second loading delay
    }, [relatedObjectType, relatedObjectId, navigate]); // Added navigate to dependency array

    const handleCreateNewClaim = () => {
        navigate('/claims/new');
    };

    const handleRowDoubleClick = (claimNumber: string) => {
        navigate(`/claims/${claimNumber}`);
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
                    <Table sx={{ minWidth: 650 }} aria-label="simple claim table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Claim #</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Date Created</TableCell>
                                <TableCell>Form Type</TableCell>
                                {/* Add more common columns as needed */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {claims.map((claim) => (
                                <TableRow
                                    key={claim.claimNumber}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    onDoubleClick={() => handleRowDoubleClick(claim.claimNumber)}
                                >
                                    <TableCell component="th" scope="row">
                                        {claim.claimNumber}
                                    </TableCell>
                                    <TableCell>{claim.firstName}</TableCell>
                                    <TableCell>{claim.lastName}</TableCell>
                                    <TableCell>{claim.dateCreated}</TableCell>
                                    <TableCell>{claim.formType}</TableCell>
                                    {/* Add more data cells */}
                                </TableRow>
                            ))}
                            {claims.length === 0 && !loading && !error && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No claims found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ClaimPage;
