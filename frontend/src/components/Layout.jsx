import React from 'react'
import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';

function Layout() {
    return (
        <>
            <NavBar />
            <Toolbar />
            <Outlet />
        </>
    );
}

export default Layout;