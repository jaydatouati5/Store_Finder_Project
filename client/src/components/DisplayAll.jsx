// ! BLACK BELT FEATURES
// Multiple uses of Conditional Styling (x2)
// Axios HTTP Service
// Lifted State

import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import Header from './Header'
import styles from './DisplayAll.module.css'
import {Paper} from '@mui/material'

const DisplayAll = ({stores , setStores}) => {
    const navigate = useNavigate()
    const remove = (id) => {
        axios.delete(`http://localhost:8000/api/store/${id}`)
        .then(res => {
            setStores(stores.filter(store => store._id != id));
        })
        .catch(err => console.error(err));
    }

    const row_color1 = {backgroundColor: "#E4CCFD!important"}
    const row_color2 = {backgroundColor: "#B0F4C8!important"}
    const row_color3 = {backgroundColor: "#BEE3FD!important"}

    return (
        <div>
            <Header title={"Store Finder"} />
            <Paper elevation={10} sx={{padding: "10px"}}>
            <h5 className="text-start">Find Stores in your area!</h5>
            <table className={styles.table}>
                <thead>
                    <th>Store</th>
                    <th>Store Number</th>
                    <th>Open</th>
                    <th>Remove</th>
                </thead>
                <tbody>
                    {stores.map((store , index) => {
                        return (
                            <tr className={store.number < 100 ? styles.row_color1 : store.number < 1000 ? styles.row_color2 : styles.row_color3}>
                                <td>{<Link to={`/stores/${store._id}`}>{store.name}</Link>}</td>
                                <td>{store.number}</td>
                                <td>{store.open ? "True" : "False"}</td>
                                <td>
                                    {store.open ? <Button type="danger" content="Remove" handleClick={() => remove(store._id)} /> : ""}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button type="secondary" content="Can't find your store?" handleClick={(e) => navigate(`/stores/add`)}/>
            </Paper>
        </div>
    )
}

export default DisplayAll