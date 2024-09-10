import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import WhatsAppButton from "../components/Whatsapp";

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
                <WhatsAppButton />
            </div>
            <Footer />
        </>
    )
}

export default LandingLayout