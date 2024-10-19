import React from 'react'
import CheckoutStages from '../components/CheckoutStages'
import logo from '../uploads/logo.png'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const CheckoutLayout = () => {
    return (
        <div className='w-full bg-white text-gray-500'>
            <div className='w-[80%] mx-auto'>
                <div className='flex justify-between p-4'>
                    <div className='flex items-center text-3xl font-bold'>
                        Checkout
                    </div>
                    <Link to='/'>
                        <img src={logo} alt='Logo' className='w-60 h-16 mx-auto' />
                    </Link>
                </div>
                <CheckoutStages />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default CheckoutLayout
