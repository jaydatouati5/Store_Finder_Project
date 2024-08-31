// ! BLACK BELT FEATURES
// Separation of Stateful and Stateless Components

import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({title , link = "" , linkContent = ""}) => {
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <h1>{title}</h1>
            {link ? <Link to={link}>{linkContent}</Link> : ""}
        </div>
    )
}

export default Header