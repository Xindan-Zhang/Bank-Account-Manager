import React, {useContext} from 'react'
import {globalContext} from '../global'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const Transaction = ({transaction}) => {

    const {deleteTransaction} = useContext(globalContext);


    const confirmDelete = (e, id) => {
        e.preventDefault();
        
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Are you sure?</h1>
                  <p>You want to delete this transaction?</p>
                  <button onClick={onClose}>No</button>
                  <button
                    onClick={() => {
                      deleteTransaction(id);
                      onClose();
                    }}
                  >
                    Yes, Delete it!
                  </button>
                </div>
              );
            }
          });
    }
    
    const sign = transaction.amount < 0 ? '-' : "";

    return (
        <React.Fragment>
            {transaction.newDay ? <h5 className="date">{transaction.createdAt.substring(0, 10)}</h5> : ""}
            <p>
                <span className="transactionText">{transaction.text}</span>
                <span>
                <span className="transactionAmount">{sign}${Math.abs(transaction.amount)}</span>
               
                <button onClick={(e) => confirmDelete(e, transaction._id)}>X</button>
                </span>
            </p>
        </React.Fragment>
    )
}

export default Transaction;
