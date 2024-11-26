import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    // const [formData, setFormData] = useState(null);
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
        // city: '',
        postalCode: '',
        phone: '',
        email: '',
        notes: ''
    });

    return (
        <PaymentContext.Provider value={{ formData, setFormData }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);
