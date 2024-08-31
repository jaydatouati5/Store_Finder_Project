// ! BLACK BELT FEATURES
// Axios HTTP Service
// Separation of Stateful and Stateless Components

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from './Button'
import Header from './Header'
import { Paper } from '@mui/material'

const StoreDetails = () => {
    const [store , setStore] = useState({})
    const {id} = useParams()
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/store/${id}`)
        .then(res => setStore(res.data))
        .catch(err => console.error(err))
    } , [])

    return (
        <div>
            <Header title={`${store.number} Details`} link='/' linkContent='Go to Home'/>
            <Paper elevation={10} sx={{padding: "10px"}}>
            <p>{store.name}</p>
            <p>Store Number : {store.number}</p>
            <p>{store.open ? "Open": "Closed"}</p>
            <Button type="primary" content="Edit Store Details" handleClick={(e) => navigate(`/stores/edit/${id}`)}/>
            </Paper>
        </div>
    )
}

export default StoreDetails