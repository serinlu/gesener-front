import React, { useState } from 'react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(''); // Controla la pestaña activa

  const menuItems = [
    { name: 'Productos', content: 'Contenido de Productos' },
    { name: 'Casos de Éxito', content: 'Contenido de Casos de Éxito' },
    { name: 'Noticias', content: 'Contenido de Noticias' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        {/* Logo */}
        <div className="p-4 border-b">
          <img src="/logo.png" alt="Logo de la empresa" className="h-12" />
        </div>
        {/* Menu Items */}
        <ul className="mt-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => setActiveTab(item.name)}
                className={`block w-full text-left px-4 py-2 transition-colors duration-300 ${
                  activeTab === item.name
                    ? 'text-indigo-600 font-bold'
                    : 'text-black hover:text-indigo-600'
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-8 bg-gray-100">
        {activeTab ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
            <p>
              {menuItems.find((item) => item.name === activeTab)?.content}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Selecciona una opción del menú.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
