import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import ReportsPage from './pages/ReportsPage';
import OrganizationPage from './pages/OrganizationPage';
import NotesPage from './pages/NotesPage';
import DocumentPage from './pages/DocumentPage';
import ClaimPage from './pages/ClaimPage';
import ClaimDetailsPage from './pages/ClaimDetailsPage'; // Make sure this exists

const App = () => {
    return (
        <BrowserRouter> {/* Wrap your routes with BrowserRouter */}
            <Routes>
                <Route path="/" element={<AppLayout />}> {/* Assuming a layout component */}
                    <Route index element={<DashboardPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="tasks" element={<TasksPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="organization" element={<OrganizationPage />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="documents" element={<DocumentPage />} />
                    <Route path="claims" element={<ClaimPage />} />
                    <Route path="claims/new" element={<ClaimDetailsPage />} />
                    <Route path="claims/:claimNumber" element={<ClaimDetailsPage />} /> {/* Route for claim details */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
