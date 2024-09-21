// CategoryContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);  // Asegúrate de inicializar como []

    useEffect(() => {
        const fetchCategories = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/categories'); // Asegúrate de que esta URL sea correcta
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              const data = await response.json();
              setCategories(data);
            } catch (error) {
              console.error('Error al obtener las categorías:', error);
            }
          };

        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};

