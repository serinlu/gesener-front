import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import Cart from '@/components/Cart';
import { Helmet } from 'react-helmet-async';
import { getProductById } from '@/services/ProductService';
import { FaArrowLeft } from 'react-icons/fa';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);

    // Comprobar si el producto actual ya está en el carrito
    const productExists = cart.some((item) => item._id === product._id);
    setIsAddedToCart(productExists);
  };

  useEffect(() => {
    getCart();

    const handleStorageChange = () => {
      getCart();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true); // Activamos el estado de carga
      const response = await getProductById(id);
      setProduct(response);
      setLoading(false); // Desactivamos el estado de carga cuando los datos están listos
    };
    getProduct();
  }, [id]);

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product); // Agregar el producto al carrito
    toggleCart(); // Abrir el carrito
  };

  return (
    <div>
      <Helmet>
        <title>{`${product.name} | Gesener`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      {/* Botón de regreso */}
      <Link to='/products' className='flex justify-start w-[80%] mx-auto mt-8 items-center gap-x-1 hover:text-blue-500'>
        <FaArrowLeft /> Regresar a Productos
      </Link>

      {/* Mostrar el spinner de carga mientras se obtiene el producto */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-[80%] justify-start mx-auto">
          <div className="max-w-7xl mx-auto lg:flex w-full">
            <div className="flex flex-col w-full lg:w-[60%] bg-white rounded-lg overflow-hidden mt-8 justify-center items-center">
              {/* Imagen del producto con relación de aspecto 1:1 */}
              <div className="w-full h-0 pb-[100%] relative border"> {/* Relación de aspecto 1:1 */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain mx-auto" // Mantener la imagen centrada y adaptada
                />
              </div>
            </div>

            {/* Detalles del producto */}
            <div className="lg:w-1/2 lg:p-6 w-full mt-8 lg:mt-0">
              <p className="text-base text-gray-600">{product.brand?.name}</p>
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="text-2xl font-bold text-black my-6">
                ${product.price}
              </p>
              {product.model && (
                <p className="text-xl py-1">Modelo: {product.model}</p>
              )}

              {/* Mostrar categorías */}
              <p className="text-xl py-1">
                Categoría(s): {product.categories && product.categories.length > 0 ? (
                  product.categories.map((category, index) => (
                    <span key={category._id}>
                      {category.name}{index < product.categories.length - 1 ? ', ' : ''}
                    </span>
                  ))
                ) : (
                  'Sin categoría'
                )}
              </p>

              <div className="flex items-center mt-4 space-x-2">
                <Button
                  className={`bg-indigo-600 text-white font-bold w-full py-2 rounded-xl hover:bg-indigo-700 transition ${product.countInStock === 0 ? 'bg-gray-300 cursor-not-allowed hover:bg-gray-300' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock === 0 ? 'Sin stock' : 'Agregar'}
                </Button>
                <Cart
                  isCartOpen={isCartOpen}
                  toggleCart={toggleCart}
                />
              </div>

              {/* Inventario */}
              <p className="text-md my-2">
                {product.countInStock > 20 ? (
                  <h1 className="text-green-500">Más de 20 unidades disponibles</h1>
                ) : product.countInStock <= 20 && product.countInStock > 1 ? (
                  <h1 className="text-green-500">{product.countInStock} unidades disponibles</h1>
                ) : product.countInStock === 1 ? (
                  <h1 className="text-orange-500">Solo queda {product.countInStock} unidad</h1>
                ) : (
                  <h1 className="text-red-500">Producto agotado</h1>
                )}
              </p>
              <h1 className="text-xs">SKU: {product.sku}</h1>
            </div>
          </div>

          <div className="w-full mt-6">
            <h1 className="w-full flex justify-center lg:justify-start text-xl lg:text-2xl py-6 font-semibold">Acerca de este producto</h1>
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <span className="font-bold text-xl">Descripción</span>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="w-full mx-auto text-justify text-lg leading-relaxed my-8"
                />
              </div>
              <div className="w-1/2">
                <span className="font-bold">Valoraciones</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;