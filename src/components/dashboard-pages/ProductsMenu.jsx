import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../../services/ProductService';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ProductsMenu = () => {
    const [products, setProducts] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [form, setForm] = useState({
        sku: '',
        name: '',
        categoryId: '',
        brandId: '',
        price: '',
        countInStock: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
        console.log(products);
    }

    const handleCreateClick = () => {
        setForm({
            sku: '',
            name: '',
            categoryId: '',
            brandId: '',
            price: '',
            countInStock: '',
        });
        setShowCreateModal(true);
    }

    const handleEditClick = (product) => {
        setForm({
            sku: product.sku,
            name: product.name,
            categoryId: product.categoryId,
            brandId: product.brandId,
            price: product.price,
            countInStock: product.countInStock,
        });
        setSelectedProduct(product);
        setShowEditModal(true);
    }

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    }

    const handleCreate = () => {
        createProduct(form)
            .then(() => {
                fetchProducts();
                setShowCreateModal(false);
            })
            .catch((error) => console.error(error));
    }

    const handleUpdate = () => {
        updateProduct(selectedProduct.id, form)
            .then(() => {
                fetchProducts();
                setShowEditModal(false);
            })
            .catch((error) => console.error(error));
    }

    const handleDelete = () => {
        deleteProduct(selectedProduct.id)
            .then(() => {
                fetchProducts();
                setShowDeleteModal(false);
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <div className='mb-3 flex justify-end'>
                <Button
                    className='p-3 text-sm w-[5%] flex text-white font-bold rounded-xl bg-blue-600'
                    onPress={handleCreateClick}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className='bg-white w-full p-4 rounded-lg h-auto space-y-2'>
                <div className='p-2 h-auto grid grid-cols-7 text-gray-400 border-b-1 border-gray-200'>
                    <h1>SKU</h1>
                    <h1>NOMBRE</h1>
                    <h1>CATEGORÍA</h1>
                    <h1>MARCA</h1>
                    <h1>PRECIO</h1>
                    <h1>STOCK</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className="p-2 text-black">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="grid grid-cols-7 items-start gap-4 p-2">
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
                                <div className="col-span-1 flex space-x-2 text-base">
                                    <button onClick={() => handleEditClick(product)}>
                                        <FaEdit className="text-green-400" />
                                    </button>
                                    <button onClick={() => handleDeleteClick(product)}>
                                        <FaTrash className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 p-2">No hay productos creados</div>
                    )}
                </div>


                {/* Modal para Crear Producto */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                            <h2 className="text-xl font-bold">Crear Producto</h2>
                            <div>
                                <label className="block mb-2">SKU</label>
                                <input
                                    type="text"
                                    value={form.sku}
                                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Categoría ID</label>
                                <input
                                    type="text"
                                    value={form.categoryId}
                                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Marca ID</label>
                                <input
                                    type="text"
                                    value={form.brandId}
                                    onChange={(e) => setForm({ ...form, brandId: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Precio</label>
                                <input
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Stock</label>
                                <input
                                    type="number"
                                    value={form.countInStock} // Cambiado de `stock` a `countInStock`
                                    onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Editar Producto */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                            <h2 className="text-xl font-bold">Editar Producto</h2>
                            {/* Campos similares a los de crear */}
                            {/* ... */}
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>Actualizar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Eliminar Producto */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                            <h2 className="text-xl font-bold">Eliminar Producto</h2>
                            <p>¿Estás seguro de que deseas eliminar el producto <strong>{selectedProduct?.name}</strong>?</p>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductsMenu;
