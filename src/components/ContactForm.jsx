import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { sendEmail } from '@/services/ContactService';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await sendEmail({
                fromEmail: formData.email,
                fromName: formData.name,
                subject: `Mensaje de contacto de ${formData.name}`,
                text: `
Nombre: ${formData.name}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Mensaje: ${formData.message}
                `,
            });

            setSuccessMessage('Correo enviado con éxito. Nos pondremos en contacto contigo pronto.');
            setFormData({ name: '', email: '', phone: '', message: '' }); // Limpiar el formulario
        } catch (error) {
            setErrorMessage('Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className="bg-white w-full p-4 rounded-lg flex flex-col gap-y-4 mx-auto"
            onSubmit={handleSubmit}
        >
            <TextField
                id="name"
                name="name"
                label="Nombre"
                variant="outlined"
                className="w-full"
                size="small"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                id="email"
                name="email"
                label="Correo"
                variant="outlined"
                className="w-full"
                size="small"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
            />
            <TextField
                id="phone"
                name="phone"
                label="Teléfono"
                variant="outlined"
                className="w-full"
                size="small"
                value={formData.phone}
                onChange={handleChange}
            />
            <TextField
                id="message"
                name="message"
                label="Mensaje"
                className="w-full"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
            />
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 text-white hover:bg-blue-600 rounded py-2 px-[6rem] font-bold"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        </form>
    );
};

export default ContactForm;
