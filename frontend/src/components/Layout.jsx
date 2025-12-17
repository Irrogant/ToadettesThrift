import React from 'react'
import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';

function Layout() {    
    return (  
    <div>
        <header>
            <NavBar />
            <Toolbar />  {/** makes sure content is not hidden behind navbar **/}
        </header>
        <main> 
            <Outlet />    
        </main>
    </div>
    );
}

export default Layout;