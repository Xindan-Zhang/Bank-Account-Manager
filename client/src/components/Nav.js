import React from 'react'
import {Link} from "react-router-dom"

const Nav = () => {
    return (
        <ul className="navLinks">
            <Link className="navItem" to="/"><li>Accounts</li></Link>
            <Link className="navItem" to="/add"><li>Add Transactions</li></Link>
            <Link className="navItem" to="/transfers"><li>Make Transfers</li></Link>
        </ul>
    )
}

export default Nav;