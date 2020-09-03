import React, {useEffect, useContext} from 'react'
import {globalContext} from '../global'



const Header = () => {

    const {getTransaction} = useContext(globalContext);
    useEffect(() => {
        getTransaction();
      
    }, [])

    return (
        <h2 className="header">
            Account Manager
        </h2>
    )
}

export default Header;