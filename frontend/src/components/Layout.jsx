import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';

function Layout({ darkMode, setDarkMode }) {
    return (
        <>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Toolbar />
            <Outlet />
        </>
    );
}

export default Layout;