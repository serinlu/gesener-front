import React from 'react'

const Contact = () => {
  return (
    <div className='py-10'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold pb-12'>CONTÁCTANOS</h1>
        <p>Responderemos a tus preguntas acerca de nuestros productos y servicios. Llena el siguiente formulario y responderemos tan pronto como sea posible.</p>
        <div className='flex gap-x-4'>
          {/* Information */}
          <div>
            <p>
              📍C. Johann Strauss 388, Of. 401, San Borja, Lima – Perú
            </p>
            <p>
              📩 ventas@gesener.pe
            </p>
            <p>
              📲 +51  919 445 232
            </p>
          </div>

          {/* Form */}
          <form className='bg-white p-4'>
            <div className='w-full p-2 border'>
              <label>Nombre</label>
              <input type="text" />
            </div>
            <div>
              <label>Correo</label>
              <input type="email" />
            </div>
            <div>
              <label>Mensaje</label>
              <textarea></textarea>
            </div>
            <button>Enviar</button>
          </form>
        </div>

      </div>
      {/* Map */}
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.242135365933!2d-76.9946741857115!3d-12.09888519142318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b0c1f8d1f7%3A0x5f7e6f7b6c2b3b5b!2sJohann%20Strauss%20388%2C%20San%20Borja%2015011!5e0!3m2!1ses-419!2spe!4v1626757027404!5m2!1ses-419!2spe"
          className='w-full h-64'
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default Contact