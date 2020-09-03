import React, {useState, useContext} from 'react'
import {globalContext} from '../global'
import {useHistory} from 'react-router-dom';
import {Warning} from './Warning'


const AddTransactions = () => {
    const history = useHistory();
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [accountName, setAccountName] = useState("Chequing Account");
    const {addTransaction, stotal, ctotal} = useContext(globalContext);
    

    const submitTransaction = (e) => {
        e.preventDefault();
        if (accountName === "Saving Account" && (stotal + parseInt(amount, 10) < 0)) {
            alert("Submission failed. You do not have enough balance in your saving account")
        } else if (accountName === "Chequing Account" && (ctotal + parseInt(amount, 10) < 0)) {
            alert("Submission failed. You do not have enough balance in your chequing account")
        } else {

            const newTransaction = {text, 
                amount, 
                accountName : accountName === "Saving Account" ? "saving" : "chequing"};
            addTransaction(newTransaction);

            sessionStorage.setItem("amount", amount);
            sessionStorage.setItem("account", accountName);

             history.push("/transaction/success")
            
        }
        
    }

    return (
        <div className="addTransaction">
            <h4>Add Transactions</h4>
            <form onSubmit={submitTransaction}>

                <div>
                    <label>Description</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} required/>
                </div>

                <div>
                    <label>Enter Amount</label>
                    <input type="Number" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                </div>


                <div>
                    <label>Select Account</label>
                    <select name="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)}>
                        <option value="Chequing Account">Chequing Account</option>
                        <option value="Saving Account">Saving Account</option>
                    </select>
                </div>

                {(accountName === "Saving Account" && (stotal + parseInt(amount, 10) < 0)) ? <Warning /> : ""}
                {(accountName === "Chequing Account" && (ctotal + parseInt(amount, 10) < 0)) ? <Warning /> : ""}


                <button className="btn">Add transaction</button>
            </form>
            
        </div>
    )
}

export default AddTransactions;