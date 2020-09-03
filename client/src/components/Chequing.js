import React, {useContext} from 'react'
import {globalContext} from '../global'


const Chequing = () => {
    const {ctotal} = useContext(globalContext);
    const sign = ctotal < 0 ? '-' : "";
    return (
        <React.Fragment>
            <h4 className="chequing"><span className="title"><span>Chequing</span> <span>Account</span></span><span className="money">{sign}${Math.abs(ctotal)}</span></h4>
        </React.Fragment>
    )
}

export default Chequing;