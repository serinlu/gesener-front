import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        companyName: '',
        socialReason: '',
        ruc: '',
        tipoDocumento: '',
        numDoc: '',
        address: '',
        optionalAddress: '',
        department: '',
        province: '',
        district: '',
        postalCode: '',
        phone: '',
        email: '',
        notes: '',
    });

    return (
        <PaymentContext.Provider value={{ formData, setFormData, orderData, setOrderData, loadingOrder, setLoadingOrder }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);
