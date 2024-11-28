import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context//AuthContext';

export const ProtectedRoute = ({ allowedRoles, children }) => {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        // Si no está autenticado, redirigir al login
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(auth.role)) {
        // Si no tiene el rol adecuado, redirigir a "Acceso denegado"
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};