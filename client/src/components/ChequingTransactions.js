import React, {useContext, useEffect} from 'react'
import {globalContext} from '../global'
import Transaction from './Transaction'

const ChequingTransactions = () => {

    const {gChequings, getTransaction} = useContext(globalContext);

   useEffect( () => {
    getTransaction();
  
}, [])

    return (
        
        <div className="chequingTransactions">
            <h4>Chequing Transactions</h4>

                {gChequings.map(transaction => {
                    return <Transaction key={transaction._id} transaction={transaction}/>
                })}         
        </div>
    )
}

export default ChequingTransactions;
