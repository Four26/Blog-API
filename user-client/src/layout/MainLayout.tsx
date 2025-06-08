import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout