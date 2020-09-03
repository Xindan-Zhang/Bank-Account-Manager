import React from 'react'
import Saving from './Saving'
import Chequing from './Chequing'
import {Link} from "react-router-dom"

const Accounts = () => {
    return (
        <React.Fragment>
            <h4 className="accountHeader">Your Accounts</h4>
            <Link className="savingLink" to="/savings"><Saving/></Link>
            <Link className="chequingLink" to="chequings"><Chequing/></Link>
        </React.Fragment>
    )
}

export default Accounts;
