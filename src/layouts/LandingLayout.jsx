import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WhatsAppButton from "../components/Whatsapp";

const LandingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col w-full -z-50">
            <Navbar />
            <div className="flex-1 text-gray-500 bg-white py-8">
                <Outlet />
                <WhatsAppButton />
            </div>
            <Footer />
        </div>
    )
}

export default LandingLayout;
