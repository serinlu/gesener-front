import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context//AuthContext';

export const ProtectedRoute = ({ allowedRoles, children }) => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>; // Mostrar un indicador de carga mientras el contexto se inicializa
    }

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(auth.user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};