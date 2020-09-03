import React, {useContext} from 'react'
import {globalContext} from '../global'

const TotalIncomeExpense = () => {
    const {transactions} = useContext(globalContext);
    

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
        if (transaction.amount >= 0) {
            
            income += transaction.amount;
        } else {
            expense += transaction.amount * -1;
        }
    })

    

    return (
        <React.Fragment>
            <div className="IncomeExpense">
                <h4><span className="IEtext"><span>Total</span> <span>Income</span></span> <span className="IEnum">${income}</span></h4>
                <h4><span className="IEtext"><span>Total</span> <span>Expense</span></span> <span className="IEnum">${expense}</span></h4>
            </div>

            <div className="line"></div>
        </React.Fragment>
    )
}

export default TotalIncomeExpense;
