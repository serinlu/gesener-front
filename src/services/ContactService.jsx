import axios from 'axios';

const API_URL = 'https://api.mailjet.com/v3.1/send';
const AUTH_KEY = import.meta.env.REACT_APP_EMAIL_AUTH_KEY

export const sendEmail = async ({ fromEmail, fromName, subject, text }) => {
    try {
        const payload = {
            Messages: [
                {
                    From: {
                        Email: fromEmail,
                        Name: fromName,
                    },
                    To: [
                        {
                            Email: 'diego.cedron@tryrook.io',
                            Name: 'gesener',
                        },
                    ],
                    Subject: subject,
                    TextPart: text,
                },
            ],
        };

        const response = await axios.post(API_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: AUTH_KEY,
            },
        });

        return response.data; // Devuelve los datos de respuesta
    } catch (error) {
        console.error('Error al enviar el correo:', error.response?.data || error.message);
        throw error;
    }
};