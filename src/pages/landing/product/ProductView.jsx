import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
  }, [id]);

  console.log(id);
  console.log(product);

  const handleIncrease = () => {
    if (quantity < product.countInStock) {
      setQuantity(prev => prev + 1);
    } else return
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else return;
  };

  const handleInputChange = () => {
    const value = Math.max(1, Math.min(product.countInStock, Number(e.target.value)))
    setQuantity(value);
  }

  return (
    <>
      <div className='w-[80%] justify-start mx-auto'>
        <div className="max-w-7xl mx-auto p-4 flex w-full">
          <div className="flex flex-col w-[60%] h-[30rem] md:flex-row bg-white rounded-lg overflow-hidden">
            {/* Imagen del producto */}
            <div className="md:w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Detalles del producto */}
          <div className="md:w-1/2 p-6">
            <p className="text-base text-gray-600">{product.brand?.name}</p>
            <h2 className="text-3xl">{product.name}</h2>
            <p className="text-2xl font-bold text-black my-6">
              ${product.price}
            </p>
            {product.model ?
              <p className='text-xl py-1'>Modelo: {product.model}</p> : null
            }

            {/* Mostrar categorías */}
            <p className='text-xl py-1'>
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
              <div>
                <Button onClick={handleDecrease} className="bg-gray-200 text-black px-3 py-2 rounded-lg mr-1">-</Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  className="text-center w-16 border rounded-lg py-2"
                  min="1"
                  max={product.countInStock}
                />
                <Button onClick={handleIncrease} className="bg-gray-200 text-black px-3 py-2 rounded-lg ml-1">+</Button>
              </div>
              <Button className="bg-indigo-600 text-white font-bold rounded-xl">
                <h1 className="p-2">Agregar</h1>
              </Button>
            </div>

            {/* Inventario */}

            <p className='text-md my-2'>
              {product.countInStock > 20 ?
                <h1 className='text-green-500'>Más de 20 unidades disponibles</h1>
                : product.countInStock <= 20 && product.countInStock > 1 ?
                  <h1 className='text-green-500'>{product.countInStock} unidades disponibles"</h1>
                  : product.countInStock === 1 ?
                    <h1 className='text-orange-500'>Solo queda {product.countInStock} unidad
                    </h1>
                    : <h1 className='text-red-500'>Producto agotado</h1>}
            </p>
            <h1 className='text-xs'>SKU: {product.sku}</h1>

          </div>
        </div>
        <div className='w-full'>
          <h1 className='text-2xl py-4'>Acerca de este producto</h1>
          <div className='flex'>
            <div className='w-1/2'>
              <span className='font-bold text-xl'>Descripción</span>
              <p className='text-gray-700 my-4'>
                {product.description ? product.description : 'Sin descripción'}
              </p>
            </div>
            <div className='w-1/2'>
              <span className='font-bold'>Valoraciones</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
