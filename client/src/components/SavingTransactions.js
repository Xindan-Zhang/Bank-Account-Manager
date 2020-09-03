import React, {useContext, useEffect} from 'react'
import {globalContext} from '../global'
import Transaction from './Transaction'

const SavingTransactions = () => {

    const {gSavings, getTransaction} = useContext(globalContext);

    useEffect(() => {
        getTransaction();
    }, [])
   

    return (
        
        <div className="savingTransactions">
            <h4>Saving Transactions</h4>

                {gSavings.map(transaction => {
                    return <Transaction key={transaction._id} transaction={transaction}/>
                })}
        </div>
    )
}

export default SavingTransactions;
