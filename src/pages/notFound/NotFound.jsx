// NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="text-lg text-gray-700 mb-4">Página no encontrada</p>
            <Link to="/" className="bg-indigo-500 text-white px-4 py-2 rounded">
                Volver a la página principal
            </Link>
        </div>
    );
};

export default NotFoundPage;