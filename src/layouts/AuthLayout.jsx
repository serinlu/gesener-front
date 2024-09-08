import { Link, Outlet } from "react-router-dom";
import loginImage from "../uploads/1.jpg"


const AuthLayout = () => {
    return (
        <div className="min-h-screen flex">
            
            
            <Outlet />
            {/* Sección de la imagen con fade */}
            <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center relative">
                <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
                {/* Degradado de fade */}
                <div className="absolute inset-0 bg-gradient-to-l from-white/0 to-white"></div>
            </div>
        </div>
    )
}

export default AuthLayout