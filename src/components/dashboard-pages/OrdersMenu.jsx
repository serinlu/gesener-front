import Alert, { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import {
    getAllOrders,
    updateShippingStatusOrderById,
} from "../../services/OrderService";
import { checkPassword } from "../../services/UserService";

const OrdersMenu = () => {
    const [formOrder, setFormOrder] = useState({});
    const [orders, setOrders] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            const successfullOrders = response.data.filter(
                (order) => order.status === "SUCCESS"
            );
            setOrders(successfullOrders);
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

    const handleOpenModal = (order) => {
        setFormOrder(order);
        setShowViewModal(true);
    };

    const handleOpenEditStatusModal = (order) => {
        setSelectedOrder(order);
        setShowEditStatusModal(true);
    };

    const handleEditStatus = async () => {
        try {
            const response = await checkPassword(password);
            console.log(response);

            if (!password) {
                showErrorAlert("Por favor, ingrese su contraseña.");
                return;
            }

            if (response == null) {
                showErrorAlert("Contraseña incorrecta.");
                return;
            }

            //-----------

            // Definir el próximo estado basado en el método de envío
            let nextStatus;
            if (selectedOrder.shipping_method === "DELIVERY") {
                // Flujo de estados para entrega a domicilio
                switch (selectedOrder.shipping_status) {
                    case "RECIBIDO":
                        nextStatus = "EN PREPARACIÓN";
                        break;
                    case "EN PREPARACIÓN":
                        nextStatus = "EN CAMINO";
                        break;
                    case "EN CAMINO":
                        nextStatus = "ENTREGADO";
                        break;
                    default:
                        showErrorAlert(
                            "El pedido ya se encuentra en el último estado."
                        );
                        return;
                }
            } else if (selectedOrder.shipping_method === "PICKUP") {
                // Flujo de estados para entrega presencial
                switch (selectedOrder.shipping_status) {
                    case "RECIBIDO":
                        nextStatus = "EN PREPARACIÓN";
                        break;
                    case "EN PREPARACIÓN":
                        nextStatus = "LISTO PARA RETIRAR";
                        break;
                    case "LISTO PARA RETIRAR":
                        nextStatus = "ENTREGADO";
                        break;
                    default:
                        showErrorAlert(
                            "El pedido ya se encuentra en el último estado."
                        );
                        return;
                }
            } else {
                showErrorAlert("Método de envío no reconocido.");
                return;
            }

            //-----------

            await updateShippingStatusOrderById(selectedOrder._id, {
                shipping_status: nextStatus,
            });

            fetchOrders();
            setShowEditStatusModal(false);
            setShowPasswordModal(false);
            setPassword("");
            showSuccessAlert("Estado de la orden actualizado correctamente");
        } catch (error) {
            console.log(error);
            showErrorAlert("Ocurrió un error al actualizar el estado del pedido.");
        }
    };

    return (
        <div className="bg-white p-3 rounded-lg">
            <Alert />
            <div className="overflow-x-auto">
                <div className="h-auto grid grid-cols-6 gap-4 p-4 min-w-[768px] text-gray-400 border-b-1 border-gray-200">
                    <h1>Orden Id</h1>
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
                                {console.log(order)}
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    {order.order_number}
                                </h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            order.shipping_status === "RECIBIDO"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : order.shipping_status ===
                                                  "EN PREPARACIÓN"
                                                ? "bg-orange-100 text-orange-600"
                                                : order.shipping_status ===
                                                  "EN CAMINO"
                                                ? "bg-blue-100 text-blue-600"
                                                : order.shipping_status ===
                                                  "LISTO PARA RETIRAR"
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-green-100 text-green-600"
                                        }`}
                                    >
                                        {order.shipping_status}
                                    </span>
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
                                    <button
                                        className="bg-blue-500 rounded-md w-12 h-12 flex items-center justify-center"
                                        onClick={() =>
                                            handleOpenEditStatusModal(order)
                                        }
                                    >
                                        <FaEdit className="text-white text-xl" />
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
                            <div className="mb-4">
                                <h1 className="text-sm font-medium">
                                    Orden ID:
                                </h1>
                                <p>{formOrder.order_number}</p>
                            </div>

                            <div className="mb-4">
                                <h1 className="text-sm font-medium">
                                    Estado de Pedido:
                                </h1>
                                <p>{formOrder.shipping_status}</p>
                            </div>

                            <div className="mb-4">
                                <h1 className="text-sm font-medium">
                                    Monto total:
                                </h1>
                                <p>{formOrder.total_amount}</p>
                            </div>
                            <div className="mb-4">
                                <h1 className="text-sm font-medium">Fecha:</h1>
                                <p>{formOrder.createdAt}</p>
                            </div>
                            <div className="mb-4">
                                <h1 className="text-sm font-medium">
                                    Comprador:
                                </h1>
                                <p>{formOrder.payer.name}</p>
                            </div>
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

            {showEditStatusModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Cambiar estado de la orden #
                            {selectedOrder.order_number}
                        </h2>
                        <label className="block mb-2 text-sm font-medium">
                            Nuevo estado
                        </label>
                        <h2 className="font-bold text-green-500">
                            {selectedOrder.shipping_status}
                        </h2>
                        <div className="mt-4 flex justify-end space-x-4">
                            <Button
                                className="bg-gray-400"
                                onClick={() => setShowEditStatusModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="bg-green-500 text-white"
                                onClick={() => {
                                    setShowEditStatusModal(false);
                                    setShowPasswordModal(true);
                                }}
                            >
                                Cambiar estado
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Contraseña */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Verificar contraseña
                        </h2>
                        <label className="block mb-2 text-sm font-medium">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="border p-2 w-full rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end space-x-4">
                            <Button
                                className="bg-gray-400"
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPassword("");
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="bg-green-500 text-white"
                                onClick={handleEditStatus}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersMenu;
