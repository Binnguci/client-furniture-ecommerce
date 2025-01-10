import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}
export default MainLayout