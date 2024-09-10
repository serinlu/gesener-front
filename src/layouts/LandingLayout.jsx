import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const LandingLayout = () => {
    return (
        // <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        //     <Header />
        //     <Outlet />
        //     <Footer />
        // </div>
        <>
            <Navbar />
            <div className="text-gray-500 bg-gray-100">
                <Outlet />
            </div>
            <Footer />
            {/* <Header /> */}
        </>
    )
}

export default LandingLayout