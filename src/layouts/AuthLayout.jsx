import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const AuthLayout = () => {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AuthLayout