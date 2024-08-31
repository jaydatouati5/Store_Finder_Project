// ! BLACK BELT FEATURES
// useReducer
// Lifted State
// Axios HTTP Service

import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import Header from './Header';
import { Paper } from '@mui/material';


const initialState = {
    name: '',
    number: '',
    open: false
}

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    };
}

const StoreForm = ({stores , setStores , type }) => {
    const form = useRef();
    const [state , dispatch] = useReducer(reducer , initialState);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const {id} = useParams();
    
    const handleErrors = (err) => {
        const errors = err.response.data.errors;
        console.log(errors)
        const errorsObject = {};
        for (const key of Object.keys(errors)){
            errorsObject[key] = errors[key].message
        }
        setErrors(errorsObject);
    }

    useEffect(() => {
        if (type == "update"){
            axios.get(`http://localhost:8000/api/store/${id}`)
            .then(res => {
            for (const [key, value] of Object.entries(res.data)){
                dispatch({type: key , payload: value});
            }
        })
        }
    } , [])

    const handleChange = (e) => {
        const {name , value} = e.target;
        if (name == "open"){
            dispatch({type: name , payload: e.target.checked});
        }
        else{
            dispatch({type: name , payload: value});
        }
    }

    const handleUpdate = (store , id) => {
        axios.put(`http://localhost:8000/api/store/${id}` , store)
        .then(res => {
            setStores(stores.map(store => store._id == id ? res.data : store));
            navigate(`/stores/${res.data._id}`);
        })
        .catch(handleErrors);
    }

    const handleCreate = (store) => {
        console.log(store)
        axios.post('http://localhost:8000/api/store' , store)
        .then(res => {
            setStores([...stores , res.data]);
            navigate(`/stores/${res.data._id}`);
        })
        .catch(handleErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type == "create")
            handleCreate(state)
        else
            handleUpdate(state , id)
    }

    return (
        <div>
            <Header title={type == "create" ? "New Store" : `Update Store ${state.number}`} link="/" linkContent='Go back Home'/>
            <Paper elevation={10} sx={{padding: "10px"}}>
            <h3>{type=="create" ? "Add a store!" : "Edit this store!"}</h3>
            <form onSubmit={handleSubmit} ref={form}>
                <div>
                    <div>
                        <label htmlFor="store_name">Store Name</label>
                        <small style={{color: "red", marginLeft: "20px"}}>{errors.name}</small>
                    </div>
                    <input onChange={handleChange} type="text" id='store_name' name='name' value={state.name} className='form-control'/>
                </div>
                <div>
                    <div>
                    <label htmlFor="store_number">Store Number</label>
                    <small style={{color: "red", marginLeft: "20px"}}>{errors.number}</small>
                    </div>
                    <input onChange={handleChange} type="number" id='store_number' name='number' value={state.number} className='form-control'/>
                </div>
                <div>
                    <input onChange={handleChange} type="checkbox"  id="open" name='open' checked={state.open}/>
                    <label htmlFor="open">Open?</label>
                    <small style={{color: "red", marginLeft: "20px"}}>{errors.open}</small>
                </div>
                {/* <Button type="success" content={type == "create" ? "Add a new Store" : "Edit Store"} handleClick={(e) => form.current.requestSubmit()}/> */}
                    <button className='btn btn-primary' type="submit">{type == "create" ? "Add a new Store" : "Edit Store"}</button>
            </form>
            </Paper>
        </div>
    )
}

export default StoreForm;