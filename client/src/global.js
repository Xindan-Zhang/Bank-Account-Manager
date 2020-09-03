import React, {createContext, useReducer, useState} from "react";
import axios from "axios"

export const globalContext = createContext();

const initialState = {
    transactions : [],
    savings: [],
    chequings: [],
    
}


function appReducer(state, action) {
    switch(action.type) {
        case "ADD_TRANSACTION":
            const newTransaction = {...action.data};
            newTransaction.newDay = true;

            let newState = {
                ...state,
                transactions: [action.data, ...state.transactions],
            };

            if (newTransaction.accountName === "saving") {
                const newsarr = [newTransaction, ...state.savings];
                if (newsarr.length >= 2) {
                    if (newsarr[0].createdAt.substring(0, 10) === (newsarr[1].createdAt.substring(0, 10))) {
                        newsarr[1].newDay = false;
                    }
                }

                newState.savings = newsarr;
            
            } else {
                const newcarr = [newTransaction, ...state.chequings];
                if (newcarr.length >= 2) {
                    if (newcarr[0].createdAt.substring(0, 10) === (newcarr[1].createdAt.substring(0, 10))) {
                        newcarr[1].newDay = false;
                    }
                }

                newState.chequings = newcarr;
            }

            
            return newState;

        case "GET_TRANSACTION":
            return {
                ...state,
                transactions: action.data.transactions,
                savings: action.data.savings,
                chequings: action.data.chequings,
                

            }
            
        case "DELETE_TRANSACTION":
            let deletedTransaction;

            state.transactions.forEach((transaction) => {
                if (transaction._id === action.data) {
                    deletedTransaction = {...transaction};
                    return;
                }
            })

            let newState2 = {
                ...state,
                transactions: state.transactions.filter(transaction => {
                    return (transaction._id !== action.data)
                })
            }

            if (deletedTransaction.accountName === 'saving') {
                const nsarr = [...state.savings];
                const length = nsarr.length;
                nsarr.forEach((saving, index) => {
                    if (saving._id === action.data) {
                        if (index === 0 && length >= 2) {
                            nsarr[1].newDay = true;
                        } else if (index < length - 1 && index - 1 >= 0) {
                            if (nsarr[index+1].createdAt.substring(0, 10) !== nsarr[index-1].createdAt.substring(0, 10)) {
                                nsarr[index+1].newDay = true;
                            }
                        }
                        return;
                    }
                })

                
                newState2.savings = nsarr.filter(saving => (saving._id !== action.data));
            
            } else {
                const ncarr = [...state.chequings];
                const length = ncarr.length;
                ncarr.forEach((chequing, index) => {
                    if (chequing._id === action.data) {
                        if (index === 0 && length >= 2) {
                            ncarr[1].newDay = true;
                        } else if (index < length - 1 && index - 1 >= 0) {
                            if (ncarr[index+1].createdAt.substring(0, 10) !== ncarr[index-1].createdAt.substring(0, 10)) {
                                ncarr[index+1].newDay = true;
                            }
                        }
                        return;
                    }
                })

                
                newState2.chequings = ncarr.filter(chequing => (chequing._id !== action.data));
            }

            return newState2;

         
        default: 
            return state;
    }
}


export const Provider = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [stotal, setStotal] = useState(0);
    const [ctotal, setCtotal] = useState(0);
    

    const addTransaction = async (transaction) => {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        try {
            const newTransaction = await axios.post('/api/transactions', transaction, config);

            if (newTransaction.data.data.accountName === "saving") {
                setStotal(stotal + newTransaction.data.data.amount);
            } else {
                setCtotal(ctotal + newTransaction.data.data.amount);
            }

            dispatch({
                type: "ADD_TRANSACTION",
                data: newTransaction.data.data,
            })

            
        } catch (error) {
            console.log("Unable to add Transaction");
        }
    }

    
    const getTransaction = async () => {
        try {

            const res = await axios.get('/api/transactions');


            let s = 0;
            let c = 0;

            res.data.data.forEach((transaction) => {
                if (transaction.accountName === "saving") {
                    s += transaction.amount;
                } else {
                     
                    c += transaction.amount;
                }
            });

            setStotal(s);
            setCtotal(c);

            res.data.data.reverse();

            const savings = res.data.data.filter((transaction) => {
                return transaction.accountName === "saving"
            })

           const slength = savings.length;

           if (slength > 0) savings[0].newDay = true;

            for (let i = 1; i < slength; i++) {
                
                if (savings[i].createdAt.substring(0, 10) === savings[i-1].createdAt.substring(0, 10)) {
                    savings[i].newDay = false;
                } else {
                    savings[i].newDay = true;
                }
            }


            const chequings = res.data.data.filter((transaction) => {
                return transaction.accountName === "chequing"
            })

           const clength = chequings.length;

           if (clength > 0) chequings[0].newDay = true;

            for (let i = 1; i < clength; i++) {
                
                if (chequings[i].createdAt.substring(0, 10) === chequings[i-1].createdAt.substring(0, 10)) {
                    chequings[i].newDay = false;
                } else {
                    chequings[i].newDay = true;
                }
            }

            dispatch({
                type: "GET_TRANSACTION",
                data: {
                    transactions: res.data.data,
                    savings,
                    chequings,
                }
            })

           

        } catch (error) {
            console.log("Unable to get transactions");
        }
    }

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`api/transactions/${id}`);

            let dTransaction;

            state.transactions.forEach((transaction) => {
                if (transaction._id === id) {
                    dTransaction = {...transaction};
                    return;
                }
            })

            if (dTransaction.accountName === "saving") {
                setStotal(stotal - dTransaction.amount)
            } else {
                setCtotal(ctotal - dTransaction.amount);
            }

            dispatch({
                type: "DELETE_TRANSACTION",
                data: id,
            })

        } catch (error) {
            console.log("Unable to delete transaction");
        }
    }


    const transferTransaction = async (amount, from, to) => {
        const transaction1 = {
            text: `Transfer to ${to}`,
            amount: (amount * -1),
            accountName: from === "Chequing Account" ? "chequing" : "saving",
        }

        const transaction2 = {
            text: `Received transfer from ${from}`,
            amount: amount,
            accountName: to === "Chequing Account" ? "chequing" : "saving",
        }

        try {
            await addTransaction(transaction1);
            await addTransaction(transaction2);
        } catch (error) {
            console.log("Unable to transfer transaction");  
        }
        
    }

    const externalTransfer = async (eAmount, eAccount, eName) => {
        try {
            const transaction = {
                text: `Transfer to ${eName}`,
                amount: (-1* eAmount),
                accountName: eAccount === "Chequing Account" ? "chequing" : "saving",
            }

            await addTransaction(transaction);
            
        } catch (error) {
            console.log("failed to make an external transfer")
            
        }
    }


    return (
       <globalContext.Provider value={{
           transactions: state.transactions,
           gSavings: state.savings,
           gChequings: state.chequings,
           addTransaction,
           getTransaction,
           transferTransaction,
           externalTransfer,
           deleteTransaction,
           stotal,
           ctotal,

       }}>
           {props.children}
       </globalContext.Provider>
    )
}
