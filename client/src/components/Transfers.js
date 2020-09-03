import React, {useState, useContext} from 'react'
import {globalContext} from '../global'
import {useHistory} from 'react-router-dom';
import axios from "axios";

const Transfers = () => {

    const history = useHistory();
    const [from, setFrom] = useState("Chequing Account");
    const [to, setTo] = useState("Saving Account");
    const [amount, setAmount] = useState(0);
    const [auto, setAuto] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [eAccount, seteAccount] = useState("Chequing Account");
    const [eName, seteName] = useState("");
    const [eAmount, seteAmount] = useState(0);

    const {transferTransaction, externalTransfer} = useContext(globalContext);

    const submitTransfer = async (e) => {
        e.preventDefault();
        if (!auto) {
            try {
                await transferTransaction(amount, from, to);

                sessionStorage.setItem("from", from);
                sessionStorage.setItem("to", to);
                sessionStorage.setItem('amount', amount);
                
                history.push('/transfer/success');

            } catch (error) {
                console.log("failed to submit transfer");
            }

        } else {
            try {
                const config = {
                    headers: {
                        'Content-Type': "application/json"
                    }
                }

                const transaction1 = {
                    text: `Transfer to ${to}`,
                    amount: (amount * -1),
                    accountName: from === "Chequing Account" ? "chequing" : "saving",
                    year: date.substring(0, 4),
                    month: date.substring(5, 7),
                    day: date.substring(8, 10),
                    hour: time.substring(0, 2),
                    minute: time.substring(3, 5),
                }
        
                const transaction2 = {
                    text: `Received transfer from ${from}`,
                    amount: amount,
                    accountName: to === "Chequing Account" ? "chequing" : "saving",
                    year: date.substring(0, 4),
                    month: date.substring(5, 7),
                    day: date.substring(8, 10),
                    hour: time.substring(0, 2),
                    minute: time.substring(3, 5),
                }

                await axios.post('/api/auto', transaction1, config);
                await axios.post('/api/auto', transaction2, config);

                
                sessionStorage.setItem("from", from);
                sessionStorage.setItem("to", to);
                sessionStorage.setItem('amount', amount);
                sessionStorage.setItem("date", date);
                sessionStorage.setItem("time", time)
                history.push('/transfer/success');


            } catch (error) {
                
            }
        }
    }
        

    const submitExternalTransfer = async (e) => {
        e.preventDefault();
        try {
            await externalTransfer(eAmount, eAccount, eName);
            
            sessionStorage.setItem("from", eAccount);
            sessionStorage.setItem("to", eName);
            sessionStorage.setItem('amount', eAmount);

            history.push('/transfer/success');

        } catch (error) {
            console.log("failed to submit external transfer");
        }
        
    }

    return (
        <div className="transfers">
            <div className='internalTransfer'>
                <h4>Internal Transfer</h4>
                <form  onSubmit={submitTransfer}>

                    <div>
                        <label>From: </label>
                        <select name="accountName" value={from} onChange={(e) => setFrom(e.target.value)}>
                            <option value="Chequing Account">Chequing Account</option>
                            <option value="Saving Account">Saving Account</option>
                        </select>
                    </div>


                    <div>
                        <label>To: </label>
                        <select name="accountName" value={to} onChange={(e) => setTo(e.target.value)}>
                            <option value="Chequing Account">Chequing Account</option>
                            <option value="Saving Account">Saving Account</option>
                        </select>
                    </div>


                    <div> 
                        <label>Amount: </label>
                        <input type="number" value={amount} onChange={(e) => {
                            setAmount(e.target.value)}} required/>
                    </div>   

                    <div className="auto">
                        <input type="checkbox" value={auto} onChange={() => setAuto(!auto)}/><label>Set auto transfer</label>
                    </div>

                    {auto ? <React.Fragment><div>
                        <label>Date: </label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Time: </label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                    </div></React.Fragment> : ""}

                    <button>Submit Transfer</button>
                  
                
                </form>
            </div>



            <div className='externalTransfer'>
                <h4>External Transfer</h4>
                <form  onSubmit={submitExternalTransfer}>

                    <div>
                        <label>Select Account:</label>
                        <select name="accountName" value={eAccount} onChange={(e) => seteAccount(e.target.value)}>
                            <option value="Chequing Account">Chequing Account</option>
                            <option value="Saving Account">Saving Account</option>
                        </select>
                    </div>


                    <div>
                        <label>Transfer To:</label>
                        <input value={eName} type="text" onChange={(e) => seteName(e.target.value)} required/>
                    </div>


                    <div> 
                        <label>Amount: </label>
                        <input type="number" value={eAmount} onChange={(e) => seteAmount(e.target.value)} required/>
                    </div>   

                    <button>Submit Transfer</button>
                </form>
            </div>
        </div>
    )
}

export default Transfers;
