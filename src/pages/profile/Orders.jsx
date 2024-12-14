import ProfileSidebar from '@/components/ProfileSidebar';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllOrdersByUser } from '../../services/OrderService';

const Orders = () => {
    const { auth } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!auth.isAuthenticated) return;
        const fetchOrders = async () => {
            try {
                const response = await getAllOrdersByUser(auth.user.user._id);
                console.log(response.data);
                setOrders(response.data);
                // setOrders(orders);
            } catch (error) {
                console.error("Error al obtener las órdenes:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="md:flex my-6">
            <Helmet>
                <title>Mis pedidos | Gesener</title>
            </Helmet>
            <ProfileSidebar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Mis Órdenes</h1>
                {orders.length === 0 ? (
                    <p className="text-lg">No tienes órdenes registradas.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Orden ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Estado</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Total</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-700">{order.order_number}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${order.status === "Completed"
                                                    ? "bg-green-100 text-green-600"
                                                    : order.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700">${order.total_amount}</td>
                                        {/* <td className="py-3 px-4 text-sm text-gray-700">{order.createdAt.split('T')[0]}</td> */}
                                        <td className="py-3 px-4 text-sm text-gray-700">{
                                            new Date(order.createdAt).toLocaleDateString('es-PE', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric'
                                            })
                                        }</td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                                                onClick={() => alert(`Ver detalles de la orden: ${order.id}`)}
                                            >
                                                Ver Detalles
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
