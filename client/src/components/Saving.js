import React, {useContext} from 'react'
import {globalContext} from '../global'


const Saving = () => {

    const {stotal} = useContext(globalContext);

    const sign = stotal < 0 ? '-' : "";
    return (
        <React.Fragment>
            <h4 className="saving"><span className="title"><span>Saving</span> <span>Account</span></span><span className="money">{sign}${Math.abs(stotal)}</span></h4>
        </React.Fragment>
    )
}

export default Saving;