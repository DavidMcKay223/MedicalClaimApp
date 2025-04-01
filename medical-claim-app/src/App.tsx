import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Tabs,
    Tab,
    Box,
    Container,
} from '@mui/material';
import {
    TasksPage,
    ReportsPage,
    OrganizationPage,
    NotesPage,
    DocumentPage,
    DashboardPage,
    ClaimPage,
} from './pages';

const App = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <DashboardPage />;
            case 'Tasks':
                return <TasksPage />;
            case 'Reports':
                return <ReportsPage />;
            case 'Organization':
                return <OrganizationPage />;
            case 'Notes':
                return <NotesPage />;
            case 'Documents':
                return <DocumentPage />;
            case 'Claims':
                return <ClaimPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MedicalClaimApp
                    </Typography>
                    <Tabs
                        value={activeTab}
                        onChange={handleChange}
                        aria-label="navigation tabs"
                        textColor="inherit"
                    >
                        <Tab value="Dashboard" label="Dashboard" />
                        <Tab value="Tasks" label="Tasks" />
                        <Tab value="Reports" label="Reports" />
                        <Tab value="Organization" label="Organization" />
                        <Tab value="Notes" label="Notes" />
                        <Tab value="Documents" label="Documents" />
                        <Tab value="Claims" label="Claims" />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Box>{renderPage()}</Box>
            </Container>
        </Box>
    );
};

export default App;
