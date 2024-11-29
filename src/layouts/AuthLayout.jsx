import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import loginImage from "@/uploads/1.jpg"
import logo from "@/uploads/logo.png"
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const AuthLayout = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth)
    return (
        <>
            {auth ? (
                <Navigate to="/" />
            ) : (
                <div className="min-h-screen flex">
                    <div className="flex-1 flex justify-center bg-white p-8">
                        <div className="w-full max-w-lg">
                            <div className="w-full mb-32 mt-12 flex justify-center">
                                <Link to="/">
                                    <img src={logo} className='w-96'></img>
                                </Link>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                    {/* Sección de la imagen con fade */}
                    <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center relative">
                        <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
                        {/* Degradado de fade */}
                        <div className="absolute inset-0 bg-gradient-to-l from-white/0 to-white"></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AuthLayout