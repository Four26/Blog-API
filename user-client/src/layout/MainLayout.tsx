import Navbar from "../pages/Navbar";
import Main from "../pages/Main";
import Footer from "../pages/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}

export default MainLayout