import { Outlet } from "react-router-dom";
import Landing from "./Landing";
import { getCookie } from './cookie';


const LandingRoute = () => {
    const alreadyLanded = getCookie("already_landed");

    if (!alreadyLanded) {
        return <Landing />;

    } return <Outlet />;
};
export default LandingRoute;