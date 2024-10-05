import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductView = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:3000/api/products/${id}`)
      const data = await response.json()
      setProduct(data)
    }
    getProduct()
  }, [id])

  console.log(id)
  console.log(product)

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 flex w-full">
        <div className="flex flex-col w-[60%] md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
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
          <p className="text-base text-gray-600">{product.brand?.name || product.brand}</p>
          <h2 className="text-3xl font-bold text-gray-600">{product.name}</h2>
          <p className="text-2xl font-bold text-black mt-4">
            ${product.price}
          </p>
          {product.countInStock > 20 ? (
            <p className='text-md'>Quedan más de 20 unidades</p>
          ) : product.countInStock <= 20 && product.countInStock > 1 ? (
            <p className='text-md'>Quedan {product.countInStock} unidades</p>
          ) : product.countInStock === 1 ? (
            <p className='text-md'>Solo queda {product.countInStock} unidad</p>
          ) : (
            <p className='text-md text-red-500'>Producto agotado</p>
          )}
          <Button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Agregar al carrito
          </Button>
        </div>
      </div>
      <div>
        {product.description ?
          <p className="text-gray-700 mt-4">{product.description}</p>
          : <p className="text-gray-700 mt-4">Sin Descripción</p>}
      </div>
    </>
  );
}

export default ProductView
