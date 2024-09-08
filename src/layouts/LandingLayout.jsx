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
            {/* <Header /> */}
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingLayout