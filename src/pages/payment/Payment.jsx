import { useContext, useEffect, useState } from "react";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { usePayment } from "@/context/PaymentContext";
import { generatePreference } from "@/services/PaymentService";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@nextui-org/react";
import { AuthContext } from "@/context/AuthContext";
import distritos from "@/utils/distritos.json";
import provincias from "@/utils/provincias.json";

const Payment = () => {
    const { orderData, loadingOrder, setPaymentData } = usePayment();
    const [preferenceId, setPreferenceId] = useState(null);
    const navigate = useNavigate();
    const { cart } = useCart();
    const { auth } = useContext(AuthContext);
    const { setFormData } = usePayment();

    const [subTotal, setSubtotal] = useState(null);
    const [envio, setEnvio] = useState(null);
    const [total, setTotal] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        // Verificamos que `auth` esté disponible antes de actualizar `formData`
        if (auth.isAuthenticated) {
            setFormData({
                name: auth.user.name,
                lastname: auth.user.lastname,
                companyName: auth.user.companyName,
                socialReason: auth.user.socialReason,
                ruc: auth.user.ruc,
                tipoDocumento: auth.user.tipoDocumento,
                numDoc: auth.user.numDoc,
                address: auth.user.address,
                department: auth.user.department,
                province: auth.user.province,
                district: auth.user.district,
                city: auth.user.city,
                postalCode: auth.user.postalCode,
                phone: auth.user.phone,
                email: auth.user.email,
                cart: cart,
                userId: auth.user._id,
            });
            setProvinces(
                auth.user.department ? provincias[auth.user.department] : []
            );
            setDistricts(
                auth.user.province ? distritos[auth.user.province] : []
            );
            setLoading(false); // Datos cargados

            setTotal(parseFloat(localStorage.getItem("total")).toFixed(2));
            setSubtotal(
                parseFloat(localStorage.getItem("subtotal")).toFixed(2)
            );
            setEnvio(parseFloat(localStorage.getItem("envio")).toFixed(2));
        }
    };

    useEffect(() => {
        getData();
    }, [auth]); // Se ejecuta cuando `auth` cambia

    // useEffect para MercadoPago
    useEffect(() => {
        const createPreferenceId = async () => {
            if (!orderData) {
                console.error("orderData no está inicializado.");
                return;
            }

            try {
                const response = await generatePreference(orderData._id);
                setPreferenceId(response.data.paymentUrl.id);
                initMercadoPago("TEST-8166d9c2-d8dd-4273-afa6-77b668c4864b", {
                    locale: "es-PE",
                });
            } catch (error) {
                console.error("Error al crear la preferencia:", error);
                navigate("/checkout/user-info");
            }
        };

        if (!loadingOrder) {
            createPreferenceId();
        }
    }, [orderData, loadingOrder]);

    const redirectToCart = () => {
        navigate("/checkout/cart");
    };

    return (
        <div className="flex justify-between">
            <div>
                <p>Pagar con Mercado Pago</p>
                <div className="w-72">
                    {preferenceId && (
                        <Wallet
                            initialization={{
                                preferenceId: preferenceId,
                                redirectMode: "modal",
                            }}
                            customization={{
                                texts: { valueProp: "smart_option" },
                            }}
                            onReady={() => console.log("Wallet is ready")}
                            onSubmit={(paymentData) =>
                                setPaymentData(paymentData)
                            }
                            locale="es-PE"
                        />
                    )}
                </div>
            </div>
            <div className="w-1/3">
                <h1 className="text-xl font-bold pb-4">Resumen de mi pedido</h1>

                {/* Encabezados alineados con los datos */}
                <div className="grid grid-cols-4 gap-4 p-2 border-b-1 border-gray-200">
                    <div></div> {/* Espacio reservado para la imagen */}
                    <h1 className="font-semibold">Nombre</h1>
                    <h1 className="font-semibold">Cantidad</h1>
                    <h1 className="font-semibold">Subtotal</h1>
                </div>

                {/* Lista de productos */}
                {cart.map((product, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-4 gap-4 items-center p-2"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 object-cover"
                        />
                        <h1 className="truncate">{product.name}</h1>
                        <h1>{product.quantity}</h1>
                        <h1>
                            ${(product.price * product.quantity).toFixed(2)}
                        </h1>
                    </div>
                ))}

                <div className="w-full text-base grid grid-cols-2 text-right mt-4">
                    <h1 className="font-semibold">Subtotal:</h1>
                    <h1>${subTotal}</h1>
                    <h1 className="font-semibold">Envío (valor fijo):</h1>
                    <h1>${envio}</h1>
                    <h1 className="font-bold">Total:</h1>
                    <h1 className="font-bold text-red-500">${total}</h1>
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        className="bg-gray-500 text-white font-bold rounded-lg"
                        onClick={redirectToCart}
                    >
                        Editar carrito
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
