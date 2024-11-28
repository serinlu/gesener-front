import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { getBrands } from '@/services/BrandService';
import { getCategories } from '@/services/CategoryService';
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/services/ProductService';
import { getImages } from '@/services/ImageService.jsx';
import { validateProduct } from '@/components/dashboard-pages/validations/productValidations.js';

const ProductsMenu = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showImagesListModal, setShowImagesListModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([]);
    const [form, setForm] = useState({
        sku: '',
        name: '',
        category: [],
        brand: {}, // Se inicializa como objeto vacío
        model: '',
        description: '',
        maxItems: '',
        price: '',
        countInStock: '',
        imageUrl: '',
    });
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [errors, setErrors] = useState({
        sku: false,
        name: false,
        category: false,
        brand: false,
        model: false,
        maxItems: false,
        description: false,
        price: false,
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchBrands();
        fetchImages()
    }, []);

    const fetchProducts = () => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    };

    const fetchCategories = () => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));
    };

    const fetchBrands = () => {
        getBrands()
            .then((data) => setBrands(data))
            .catch((error) => console.error(error));
    };

    const fetchImages = () => {
        getImages()
            .then((data) => setImages(data))
            .catch((error) => console.error(error));
    };

    const handleImageSelect = (imageUrl) => {
        setForm((prevForm) => ({
            ...prevForm,
            imageUrl
        }))
        setShowImagesListModal(false);
    }

    const openFormModal = (product = null) => {
        if (product) {
            setIsEditing(true);
            setSelectedProduct(product);
            setForm({
                sku: product.sku,
                name: product.name,
                category: product.categories || [], // Manejar caso en que no haya categorías
                brand: product.brand || {}, // Manejar caso en que no haya marca
                description: product.description || '',
                model: product.model,
                maxItems: product.maxItems,
                price: product.price,
                countInStock: product.countInStock,
                imageUrl: product.imageUrl || '',
            })
        } else {
            setIsEditing(false);
            setSelectedProduct(null);
            setForm({
                sku: '',
                name: '',
                category: [],
                brand: {}, // Inicializa como objeto vacío
                description: '',
                model: '',
                maxItems: '',
                price: '',
                countInStock: 0,
                imageUrl: '',
            });
        }
        setShowModal(true);
    }

    const handleSave = async () => {
        if (isEditing) {
            if (!selectedProduct) return
            handleUpdate()
        } else {
            handleCreate()
        }
        setShowModal(false);
    }

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleCreate = async () => {
        setErrors({}); // Limpiar errores previos

        // Validar producto
        const validationErrors = validateProduct(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const existingSkus = products.map(product => product.sku);
        console.log(existingSkus);

        if (existingSkus.includes(form.sku)) {
            errors.sku = "el sku ya existe"
        }

        const newProduct = {
            sku: form.sku,
            name: form.name,
            brand: form.brand || null, // Permitir que no tenga marca
            categories: form.category || [], // Permitir que sea un array vacío
            description: form.description || '',
            model: form.model,
            maxItems: form.maxItems,
            price: form.price,
            countInStock: form.countInStock,
            imageUrl: form.imageUrl || '',
        }

        try {
            const response = await createProduct(newProduct);
            console.log(response);

            if (response) {
                fetchProducts();
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    const handleUpdate = () => {
        if (!selectedProduct) return; // Verificar que hay un producto seleccionado

        const updatedProduct = {
            _id: selectedProduct._id,
            sku: form.sku,
            name: form.name,
            brand: form.brand || null, // Permitir que no tenga marca
            categories: form.category || [], // Permitir que sea un array vacío
            description: form.description || '',
            model: form.model,
            maxItems: form.maxItems,
            price: form.price,
            countInStock: form.countInStock,
            imageUrl: form.imageUrl || '',
        };

        const newErrors = validateProduct(form);

        // Si hay errores, actualizar estado y detener la ejecución
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(null);

        updateProduct(selectedProduct._id, updatedProduct)
            .then((response) => {
                console.log('Producto actualizado:', response);
                fetchProducts();
                setShowEditModal(false);
            })
            .catch((error) => {
                console.error('Error al actualizar el producto:', error);
            });
    };

    const handleDelete = () => {
        deleteProduct(selectedProduct._id)
            .then(() => {
                fetchProducts();
                setShowDeleteModal(false);
            })
            .catch((error) => console.error(error));
    };

    const handleCheckboxChange = (categoryId) => {
        setForm((prevForm) => {
            const category = categories.find(cat => cat._id === categoryId);
            const newCategories = prevForm.category.includes(category)
                ? prevForm.category.filter((cat) => cat._id !== categoryId)
                : [...prevForm.category, category];
            return { ...prevForm, category: newCategories };
        });
    };

    const getSelectedCategoryNames = () => {
        return form.category
            .map((cat) => cat.name) // Muestra el nombre de cada objeto de categoría
            .join(', ');
    };

    const toggleCategoryList = () => {
        setShowCategoryList((prev) => !prev);
    };

    return (
        <>
            <div className='mb-3 flex justify-end'>
                <Button
                    className='p-3 text-sm w-[5%] flex text-white font-bold rounded-xl bg-blue-600'
                    onPress={() => openFormModal()}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className='bg-white w-full p-4 rounded-lg h-auto space-y-2'>
                <div className='p-2 h-auto grid grid-cols-8 text-gray-400 border-b-1 border-gray-200'>
                    <h1>IMAGEN</h1>
                    <h1>SKU</h1>
                    <h1>NOMBRE</h1>
                    <h1>CATEGORÍA</h1>
                    <h1>MARCA</h1>
                    <h1>PRECIO ($)</h1>
                    <h1>STOCK</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className="p-2 text-black">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="grid grid-cols-8 items-start gap-4 p-2">
                                <td className="p-2 text-center">
                                    {/* Renderizar la imagen usando la URL */}
                                    <img
                                        src={product.imageUrl} // URL de la imagen guardada en el producto
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded" // Ajusta el tamaño de la imagen según tus necesidades
                                    />
                                </td>
                                <h1 className="col-span-1 text-left">{product.sku}</h1>
                                <h1 className="col-span-1 text-left">{product.name}</h1>
                                <h1 className="col-span-1 text-left">
                                    {product.categories.length > 0
                                        ? product.categories.map((category) => category.name).join(', ')
                                        : <h1 className='text-red-600'>Sin asignar</h1>}
                                </h1>
                                <h1 className="col-span-1 text-left">
                                    {product.brand?.name || <h1 className='text-red-600'>Sin asignar</h1>}
                                </h1>
                                <h1 className="col-span-1 text-left">{product.price}</h1>
                                <h1 className="col-span-1 text-left">{product.countInStock ?? '0'}</h1>
                                <div className="col-span-1 flex space-x-2 text-base items-center">
                                    <Button
                                        className="bg-green-500 rounded-md w-1/3 flex items-center justify-center px-4 py-2"
                                        onClick={() => openFormModal(product)}
                                    >
                                        <FaEdit className="text-white text-sm" />
                                    </Button>
                                    <Button
                                        className="bg-red-500 rounded-md w-1/3 flex items-center justify-center px-4 py-2"
                                        onClick={() => handleDeleteClick(product)}
                                    >
                                        <FaTrash className="text-white text-sm" />
                                    </Button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 p-2">No hay productos creados</div>
                    )}
                </div>

                {/* Modal para Crear Producto */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ marginTop: 0 }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90%] flex flex-col z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{isEditing ? 'Editar producto' : 'Crear producto'}</h2>
                                <h1 className="text-xs"><span className="text-red-400 text-md pr-1">*</span>Campos obligatorios</h1>
                            </div>
                            {/* Contenido del formulario */}
                            <div className="overflow-y-auto space-y-4 flex-grow">
                                <div>
                                    <label className="block mb-1">SKU<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="number"
                                        value={form.sku}
                                        onChange={(e) => {
                                            setForm({ ...form, sku: e.target.value });
                                            setErrors({ ...errors, sku: '' }); // Limpiar el error mientras el usuario escribe
                                        }}
                                        onBlur={() => {
                                            const newErrors = validateProduct(form); // Validar el campo cuando pierde el foco
                                            setErrors((prevErrors) => ({ ...prevErrors, sku: newErrors.sku })); // Mostrar el error solo para el campo SKU
                                        }}
                                        className={`w-full p-2 border rounded ${errors?.sku ? 'border-red-500' : ''}`}
                                    />
                                    {errors?.sku && <p className="text-xs text-red-400">{errors.sku}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1">Nombre<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => {
                                            setForm({ ...form, name: e.target.value });
                                            setErrors({ ...errors, name: '' }); // Limpiar el error mientras el usuario escribe
                                        }}
                                        onBlur={() => {
                                            const newErrors = validateProduct(form); // Validar el campo cuando pierde el foco
                                            setErrors((prevErrors) => ({ ...prevErrors, name: newErrors.name })); // Mostrar el error solo para el campo SKU
                                        }}
                                        className={`w-full p-2 border rounded ${errors?.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors?.name && <p className="text-xs text-red-400">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1">Categorías<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="text"
                                        value={getSelectedCategoryNames()}
                                        readOnly
                                        className={`w-full p-2 border rounded cursor-pointer ${errors?.category ? 'border-red-500' : ''}`}
                                        onClick={toggleCategoryList}
                                        onBlur={() => {
                                            const newErrors = validateProduct(form);
                                            setErrors((prevErrors) => ({ ...prevErrors, category: newErrors.category }));
                                        }}
                                    />
                                    {errors?.category && <p className="text-xs text-red-400">{errors.category}</p>}

                                    {showCategoryList && (
                                        <div className="border rounded p-2 max-h-60 overflow-y-auto absolute bg-white z-10">
                                            {categories.map((category) => (
                                                <div key={category._id} className="flex items-center pt-2">
                                                    <input
                                                        type="checkbox"
                                                        id={category._id}
                                                        checked={form.category.some(cat => cat._id === category._id)}
                                                        onChange={() => handleCheckboxChange(category._id)}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={category._id} className="cursor-pointer">
                                                        {category.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1">
                                        Marca<span className="pl-1 text-red-400 font-bold">*</span>
                                    </label>
                                    <select
                                        value={form.brand?._id || ''}
                                        onChange={(e) => {
                                            const selectedBrand = brands.find((brand) => brand._id === e.target.value);
                                            setForm((prevForm) => ({
                                                ...prevForm,
                                                brand: selectedBrand || {},
                                            }));
                                            setErrors((prevErrors) => ({
                                                ...prevErrors,
                                                brand: '', // Limpiar error al seleccionar
                                            }));
                                        }}
                                        onBlur={() => {
                                            if (!form.brand || !form.brand._id) {
                                                setErrors((prevErrors) => ({
                                                    ...prevErrors,
                                                    brand: 'La marca es obligatoria', // Mostrar error si no hay marca seleccionada
                                                }));
                                            }
                                        }}
                                        className={`w-full p-2 border rounded ${errors?.brand ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">Seleccionar marca</option>
                                        {brands.map((brand) => (
                                            <option key={brand._id} value={brand._id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.brand && <p className="text-xs text-red-400">{errors.brand}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1">Modelo<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="text"
                                        value={form.model}
                                        onChange={(e) => {
                                            setForm({ ...form, model: e.target.value });
                                            setErrors({ ...errors, model: '' }); // Limpiar el error mientras el usuario escribe
                                        }}
                                        onBlur={() => {
                                            const newErrors = validateProduct(form); // Validar el campo cuando pierde el foco
                                            setErrors((prevErrors) => ({ ...prevErrors, model: newErrors.model })); // Mostrar el error solo para el campo SKU
                                        }}
                                        className={`w-full p-2 border rounded ${errors?.model ? 'border-red-500' : ''}`}
                                    />
                                    {errors?.model && <p className="text-xs text-red-400">{errors.model}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1">Descripción<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="text"
                                        value={form.description}
                                        onChange={(e) => {
                                            setForm({ ...form, description: e.target.value });
                                            setErrors({ ...errors, description: '' }); // Limpiar el error mientras el usuario escribe
                                        }}
                                        onBlur={() => {
                                            const newErrors = validateProduct(form); // Validar el campo cuando pierde el foco
                                            setErrors((prevErrors) => ({ ...prevErrors, description: newErrors.description })); // Mostrar el error solo para el campo SKU
                                        }}
                                        className={`w-full p-2 border rounded ${errors?.description ? 'border-red-500' : ''}`}
                                    />
                                    {errors?.description && <p className="text-xs text-red-400">{errors.description}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1">Precio<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="number"
                                        value={form.price}
                                        onChange={(e) => {
                                            setForm({ ...form, price: e.target.value });
                                            setErrors({ ...errors, price: '' }); // Limpiar el error mientras el usuario escribe
                                        }}
                                        onBlur={() => {
                                            const newErrors = validateProduct(form); // Validar el campo cuando pierde el foco
                                            setErrors((prevErrors) => ({ ...prevErrors, price: newErrors.price })); // Mostrar el error solo para el campo SKU
                                        }}
                                        className={`w-full p-2 border rounded ${errors?.price ? 'border-red-500' : ''}`}
                                    />
                                    {errors?.price && <p className="text-xs text-red-400">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1">Stock</label>
                                    <input
                                        type="number"
                                        value={form.countInStock}
                                        onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Cantidad máxima de items por carrito<span className="pl-1 text-red-400 font-bold">*</span></label>
                                    <input
                                        type="number"
                                        value={form.maxItems}
                                        onChange={(e) => setForm({ ...form, maxItems: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <div className='flex items-center pb-2 space-x-3'>
                                        <label className="block">Imagen del Producto</label>
                                        <Button className='bg-blue-600 rounded-lg text-white p-2' onPress={() => setShowImagesListModal(true)}>Seleccionar</Button>
                                    </div>

                                    {/* Vista previa de la imagen seleccionada */}
                                    {form.imageUrl ? (
                                        <div className="flex flex-col items-center mt-2">
                                            <img src={form.imageUrl} alt="Vista previa de imagen" className="w-full h-40 object-cover border rounded" />
                                            <button
                                                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                                                onClick={() => setForm({ ...form, imageUrl: '' })}
                                            >
                                                Quitar Imagen
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">No se ha seleccionado ninguna imagen</p>
                                    )}
                                </div>
                            </div>
                            {/* Botones */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => [setShowModal(false), setErrors(false)]}>Cancelar</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>{isEditing ? 'Guardar cambios' : 'Crear'}</button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3">
                            <h2 className="text-xl font-bold">Eliminar Producto</h2>
                            <p>¿Estás seguro de que deseas eliminar el producto <strong>{selectedProduct?.name}</strong>?</p>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}

                {showImagesListModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[50%] h-[80%]">
                            <h2 className="text-xl font-bold">Imágenes del Producto</h2>
                            <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[85%]">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image?.name}
                                        className="w-full h-full object-cover border-2 cursor-pointer"
                                        onClick={() => handleImageSelect(image.url)} // Asegúrate de pasar 'image.url' aquí
                                    />
                                ))}
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowImagesListModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductsMenu;