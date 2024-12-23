import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { getAllOrders } from "../../services/OrderService";

const SalesMenu = () => {
    const [formOrder, setFormOrder] = useState({});
    const [orders, setOrders] = useState({});
    const [showViewModal, setShowViewModal] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            const successfullOrders = response.data.filter(
                (order) =>
                    order.status === "SUCCESS" &&
                    order.shipping_status === "ENTREGADO"
            );
            setOrders(successfullOrders);
            successfullOrders.map((order) => {
                setFormOrder({
                    order_number: order.order_number,
                    status: order.status,
                    shipping_status: order.shipping_status,
                    total_amount: order.total_amount,
                    createdAt: order.createdAt,
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date
            .toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            .replace(".", "");
        const formattedTime = date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate}, ${formattedTime}`;
    };

    const handleOpenModal = () => {
        setShowViewModal(true);
    };

    const orderData = [
        { title: "# Orden", value: formOrder.order_number },
        { title: "Estado de Pago", value: formOrder.status },
        { title: "Estado de Pedido", value: formOrder.shipping_status },
        { title: "Monto total", value: formOrder.total_amount },
        { title: "Fecha", value: formOrder.createdAt },
    ];

    return (
        <div className="bg-white p-3 rounded-lg">
            <div className="overflow-x-auto">
                <div className="h-auto grid grid-cols-6 gap-4 p-4  min-w-[768px] text-gray-400 border-b-1 border-gray-200">
                    <h1>Orden Id</h1>
                    <h1>Estado de Pago</h1>
                    <h1>Estado de Pedido</h1>
                    <h1>Total</h1>
                    <h1>Fecha</h1>
                    <h1>Acciones</h1>
                </div>
                <div className="text-black">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div
                                key={order._id}
                                className="grid grid-cols-6 gap-4 p-4 min-w-[768px] items-center"
                            >
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    {order.order_number}
                                </h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    {order.status}
                                </h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    {order.shipping_status}
                                </h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    ${order.total_amount}
                                </h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    {formatDateTime(order.createdAt)}
                                </h1>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-orange-500 rounded-md w-12 h-12 flex items-center justify-center"
                                        onClick={() => handleOpenModal(order)}
                                    >
                                        <FaEye className="text-white text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 p-2">
                            No hay usuarios registrados
                        </div>
                    )}
                </div>
            </div>

            {showViewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg h-auto max-h-[80vh] overflow-y-auto mx-8">
                        <h2 className="text-xl font-bold mb-4">
                            Detalles del usuario
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {orderData.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <h1 className="text-sm font-medium">
                                        {item.title}:
                                    </h1>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                className="bg-red-500 rounded-lg text-white font-bold"
                                onClick={() => setShowViewModal(false)}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesMenu;
