// productValidations.js

export const validateProduct = (form) => {

    const errors = {};

    // Validar SKU
    if (!form.sku) {
        errors.sku = 'El SKU es obligatorio';
    }

    // Validar Nombre
    if (!form.name) {
        errors.name = 'El nombre es obligatorio';
    }

    // Validar Categorías
    if (!form.category || form.category.length === 0) {
        errors.category = 'Debe seleccionar al menos una categoría';
    }

    // Validar Marca
    if (!form.brand || !form.brand._id) {
        errors.brand = 'La marca es obligatoria';
    }

    if (!form.description) {
        errors.description = 'La descripción es obligatoria';
    }

    // Validar Precio
    if (!form.price) {
        errors.price = 'El precio es obligatorio';
    } else if (isNaN(form.price) || form.price <= 0) {
        errors.price = 'El precio debe ser un número válido mayor que cero';
    }

    return errors;
};
