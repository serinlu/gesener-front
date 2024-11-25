import React from 'react'
import ProfileSidebar from '../../components/ProfileSidebar'
import { Helmet } from 'react-helmet-async'

const Orders = () => {
    return (
        <div>
            <Helmet>
                <title>Mis pedidos | Gesener</title>
            </Helmet>
            <ProfileSidebar />
        </div>
    )
}

export default Orders
