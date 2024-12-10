import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clientAxios from '@/config/axios';
import { Button } from "@nextui-org/react";

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Verificando...');  // Mensaje inicial de verificación

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await clientAxios.get(`/auth/verify-email/${token}`);
                console.log(response);
                setStatus(response.data.message); // Mostrar mensaje del backend
                if (response.status === 200) {
                    setTimeout(() => navigate('/login'), 3000); // Redirige después de 3 segundos
                }
            } catch (error) {
                console.error("Error en la verificación", error);
                setStatus('Error en la verificación de su correo. Inténtelo nuevamente.');
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 className="text-xl mb-2">Verificación de cuenta</h1>
            <p className="text-base my-2">{status}</p>
            {status === 'Correo verificado con éxito. Ahora puedes iniciar sesión.' && (
                <Button className="bg-blue-600 text-white w-full rounded-lg font-bold mt-4 hover:bg-blue-700" onClick={() => navigate('/login')}>
                    Iniciar sesión
                </Button>
            )}
        </div>
    );
};

export default EmailVerification;