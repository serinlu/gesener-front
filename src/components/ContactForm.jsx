import { TextField } from '@mui/material'
import React from 'react'

const ContactForm = () => {
    return (
        <form className="bg-white w-full p-4 rounded-lg flex flex-col gap-y-4 mx-auto">
            <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                className="w-full"
                size="small"
            />
            <TextField
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                className="w-full"
                size="small"
            />
            <TextField
                id="outlined-basic"
                label="Teléfono"
                variant="outlined"
                className="w-full"
                size="small"
            />
            <TextField
                id="outlined-multiline-static"
                label="Mensaje"
                className="w-full"
                multiline
                rows={4}
                defaultValue=""
            />

            <div className="flex justify-center">
                <button className="bg-blue-500 text-white hover:bg-blue-600 rounded py-2 px-[6rem] font-bold">Enviar</button>
            </div>
        </form>
    )
}

export default ContactForm
