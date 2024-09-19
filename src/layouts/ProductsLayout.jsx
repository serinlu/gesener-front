import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const ProductsLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ProductsLayout
