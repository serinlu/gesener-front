import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

export const ProtectedRoute = ({ allowedRoles, children }) => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>; // Mostrar un indicador de carga mientras el contexto se inicializa
    }

    // Redirige al login si el usuario no está autenticado
    if (!auth.isAuthenticated || !auth.user) {
        return <Navigate to="/login" replace />;
    }

    // Redirige a "unauthorized" si el rol del usuario no está permitido
    if (!allowedRoles.includes(auth.user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Si pasa todas las validaciones, muestra el contenido
    return children;
};
