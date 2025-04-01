import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import NoteIcon from '@mui/icons-material/Note';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Example icon for Claims

interface MenuItem {
    text: string;
    path: string;
    icon: React.ReactElement;
}

const drawerWidth = 240;

const AppLayout: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItems: MenuItem[] = [
        { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Tasks', path: '/tasks', icon: <ListAltIcon /> },
        { text: 'Reports', path: '/reports', icon: <AssignmentIcon /> },
        { text: 'Organization', path: '/organization', icon: <AccountTreeIcon /> },
        { text: 'Notes', path: '/notes', icon: <NoteIcon /> },
        { text: 'Documents', path: '/documents', icon: <FolderOpenIcon /> },
        { text: 'Claims', path: '/claims', icon: <LocalHospitalIcon /> },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline /> {/* Provides consistent baseline styling */}
            <AppBar
                position="fixed"
                sx={{
                    ml: open ? `${drawerWidth}px` : 0,
                    width: `calc(100% - ${open ? drawerWidth : 0}px)`,
                    transition: (theme) =>
                        theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    ...(open && {
                        transition: (theme) =>
                            theme.transitions.create(['width', 'margin'], {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        MedicalClaimApp
                    </Typography>
                    {/* You can add more items to the AppBar here */}
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon /> {/* Or a ChevronLeft icon */}
                    </IconButton>
                </Toolbar>
                {/* <Divider /> */}
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* <Divider /> */}
                {/* You can add more lists or content to the drawer */}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: open ? `${drawerWidth}px` : 0 }}>
                <Toolbar /> {/* Empty toolbar to offset content below the AppBar */}
                <Outlet /> {/* This is where your routed components will be rendered */}
            </Box>
        </Box>
    );
};

export default AppLayout;