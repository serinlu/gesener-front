import { AuthContext } from "@/context/AuthContext";
import { usePayment } from "@/context/PaymentContext";
import { useCart } from "@/hooks/useCart";
import { updateUser } from "@/services/AuthService";
import { createOrder } from "@/services/OrderService";
import departamentos from "@/utils/departamentos.json";
import distritos from "@/utils/distritos.json";
import provincias from "@/utils/provincias.json";
import { Button } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { auth } = useContext(AuthContext);
    const { cart } = useCart();
    const { formData, setFormData, setOrderData, setLoadingOrder } =
        usePayment();
    const navigate = useNavigate();
    const [saveData, setSaveData] = useState(false);
    const [subTotal, setSubtotal] = useState(null);
    const [envio, setEnvio] = useState(null);
    const [total, setTotal] = useState(null);
    const [factureChecked, setFactureChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [delivery, setDelivery] = useState(false);

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

    // Crear la orden
    const generateOrder = async () => {
        setLoadingOrder(true);
        const transformData = {
            products: cart.map((product) => {
                return {
                    id: product._id,
                    image_url: product.imageUrl,
                    title: product.name,
                    description: product.description,
                    category_id: product.categories[0]?._id?.toString(),
                    unit_price: product.price,
                    quantity: product.quantity,
                };
            }),
            payer: {
                id: auth.user._id,
                name: formData.name,
                surname: formData.lastname,
                email: formData.email,
                identification: {
                    type: formData.tipoDocumento,
                    number: formData.numDoc,
                },
                address: {
                    street_name: formData.address,
                    // street_number: formData.city,
                    zip_code: formData.postalCode,
                },
            },
            shipping_method: delivery ? "DELIVERY" : "PICKUP",
            delivery_address: delivery ? formData.address : null,
            store_pickup_location: delivery ? null : "Sucursal Principal",
        };

        console.log(transformData);

        const response = await createOrder(transformData);

        if (response) {
            setOrderData(response.data);
            setLoadingOrder(false);
        } else {
            console.error("Error al crear la orden");
            setLoadingOrder(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const total = parseFloat(localStorage.getItem("total"));
        formData.total = total;
        // Aquí puedes manejar el envío de los datos
        if (!factureChecked) {
            delete formData.companyName;
            delete formData.socialReason;
            delete formData.ruc;
        }

        if (saveData && auth?.user._id) {
            // Guardar los datos en el backend si saveData está marcado
            const updatedData = await updateUser(auth.user._id, formData);
            if (updatedData) {
                console.log("Datos actualizados correctamente");
            } else {
                console.error("Error al actualizar los datos");
            }
        }

        generateOrder();

        navigate("/checkout/payment");
    };

    const handleFacture = () => {
        setFactureChecked(!factureChecked);
    };

    if (loading) {
        return <div>Cargando datos...</div>; // O un spinner de carga
    }

    const redirectToCart = () => {
        navigate("/checkout/cart");
    };

    const changeDepartamentos = (e) => {
        const selectedDepartmentId = Number(e.target.value);
        setFormData((prevForm) => ({
            ...prevForm,
            department: selectedDepartmentId,
            province: "",
            district: "",
        }));
        setProvinces(
            selectedDepartmentId ? provincias[selectedDepartmentId] : []
        );
        setDistricts([]);
    };

    const changeProvincias = (e) => {
        const selectedProvinceId = Number(e.target.value);
        setFormData((prevForm) => ({
            ...prevForm,
            province: selectedProvinceId,
            district: "",
        }));
        setDistricts(selectedProvinceId ? distritos[selectedProvinceId] : []);
    };

    const changeDistritos = (e) => {
        const selectedDistrictId = Number(e.target.value);
        setFormData((prevForm) => ({
            ...prevForm,
            district: selectedDistrictId,
        }));
    };

    return (
        <div>
            <Helmet>
                <title>Checkout | Gesener</title>
            </Helmet>
            <div className="my-8 text-3xl font-bold">Datos de facturación</div>
            <div className="flex space-x-4">
                <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Apellidos *
                            </label>
                            <input
                                type="text"
                                name="apellidos"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Checkbox y texto "Solicitar factura" clicable */}
                    <div className="flex items-center mt-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="mr-2"
                                name="solicitarFactura"
                                checked={factureChecked}
                                onChange={handleFacture}
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Solicitar factura
                            </span>
                        </label>
                    </div>

                    {/* Campos adicionales si se selecciona "Solicitar factura" */}
                    {factureChecked && (
                        <div className="mt-6 space-y-6 p-4 border-2 rounded-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre de la empresa *
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Razón social *
                                </label>
                                <input
                                    type="text"
                                    name="socialReason"
                                    value={formData.socialReason}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Número de RUC *
                                </label>
                                <input
                                    type="number"
                                    name="ruc"
                                    value={formData.ruc}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tipo de Documento *
                            </label>
                            <input
                                type="text"
                                name="tipoDocumento"
                                value={formData.tipoDocumento}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Número de Documento *
                            </label>
                            <input
                                type="number"
                                name="numDoc"
                                value={formData.numDoc}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Correo electrónico *
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Teléfono *
                            </label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-around text-white">
                        <span
                            className="bg-blue-500 hover:bg-blue-400 duration-300 flex justify-center items-center w-60 h-10 rounded-full cursor-pointer"
                            onClick={() => setDelivery(false)}
                        >
                            Retiro en tienda
                        </span>
                        <span
                            className="bg-blue-500 hover:bg-blue-400 duration-300 flex justify-center items-center w-60 h-10 rounded-full cursor-pointer"
                            onClick={() => setDelivery(true)}
                        >
                            Delivery
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Dirección *
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!delivery}
                            required
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500 mb-4"
                        />
                        <input
                            type="text"
                            name="optionalAddress"
                            placeholder="Referencias (Ej. Frente a la plaza principal)"
                            value={formData.optionalAddress}
                            onChange={handleChange}
                            disabled={!delivery}
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Región *
                            </label>
                            <select
                                name="departamentos"
                                value={formData.department}
                                id="departamentos"
                                className="w-full p-2 border rounded mt-1"
                                onChange={changeDepartamentos}
                            >
                                <option value="">Seleccionar</option>
                                {departamentos.map((data, key) => {
                                    return (
                                        <option
                                            key={key}
                                            value={data.id_ubigeo}
                                        >
                                            {data.nombre_ubigeo}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Provincia *
                            </label>
                            <select
                                name="provincias"
                                value={formData.province}
                                id="provincias"
                                className="w-full p-2 border rounded mt-1"
                                onChange={changeProvincias}
                            >
                                <option value="">Seleccionar</option>
                                {provinces.map((data, key) => {
                                    return (
                                        <option
                                            key={key}
                                            value={data.id_ubigeo}
                                        >
                                            {data.nombre_ubigeo}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Distrito *
                            </label>
                            <select
                                name="distritos"
                                value={formData.district}
                                id="distritos"
                                className="w-full p-2 border rounded mt-1"
                                onChange={changeDistritos}
                            >
                                <option value="">Seleccionar</option>
                                {districts.map((data, key) => {
                                    return (
                                        <option
                                            key={key}
                                            value={data.id_ubigeo}
                                        >
                                            {data.nombre_ubigeo}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Código Postal *
                            </label>
                            <input
                                type="number"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Notas para el pedido
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full h-20 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            rows={4} // Puedes ajustar el número de filas según la altura deseada
                        />
                    </div>

                    <div className="flex items-center mt-4 cursor-pointer">
                        <label
                            htmlFor="saveData"
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                id="saveData"
                                type="checkbox"
                                className="mr-2"
                                checked={saveData}
                                onChange={(e) => setSaveData(e.target.checked)}
                            />
                            Guardar mis datos para futuras compras
                        </label>
                    </div>

                    {/* Rest of the form fields */}
                    <div className="pb-10">
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md border-1 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold"
                        >
                            Proceder a pagar
                        </Button>
                    </div>
                </form>
                <div className="w-1/3">
                    <h1 className="text-xl font-bold pb-4">
                        Resumen de mi pedido
                    </h1>

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
        </div>
    );
};

export default Checkout;
