// ! BLACK BELT FEATURES
// Separation of Stateful and Stateless Components

import React from 'react'

const Button = ({type , content , handleClick}) => {

    return (
        <button className={`btn btn-${type}`} onClick={handleClick}>{content}</button>
    )
}

export default Button