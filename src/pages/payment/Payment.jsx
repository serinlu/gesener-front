import { useEffect, useState } from "react";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { usePayment } from "@/context/PaymentContext";
import { generatePreference } from "@/services/PaymentService";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const { orderData, loadingOrder, setPaymentData } = usePayment();
    const [preferenceId, setPreferenceId] = useState(null);
    const navigate = useNavigate();

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

    return (
        <>
            <p>Pagar con Mercado Pago</p>
            <div className="w-72">
                {preferenceId && (
                    <Wallet
                        initialization={{
                            preferenceId: preferenceId,
                            redirectMode: "modal",
                        }}
                        customization={{ texts: { valueProp: "smart_option" } }}
                        onReady={() => console.log("Wallet is ready")}
                        onSubmit={(paymentData) => setPaymentData(paymentData)}
                        locale="es-PE"
                    />
                )}
            </div>
        </>
    );
};

export default Payment;
