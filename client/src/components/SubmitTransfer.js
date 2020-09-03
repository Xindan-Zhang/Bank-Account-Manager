import React from 'react'


 const SubmitTransfer = () => {

    return (
        <React.Fragment>
            <h3>Submission Successful</h3>
            {!sessionStorage['date'] ? <p>You have transfered ${sessionStorage.getItem("amount")} from {sessionStorage.getItem("from")} to {sessionStorage.getItem("to")}.</p> : 
            <p>You have scheduled a ${sessionStorage.getItem("amount")} transfer from {sessionStorage.getItem("from")} to {sessionStorage.getItem("to")} at {sessionStorage.getItem("time")} on {sessionStorage.getItem("date")}</p>}
        </React.Fragment>
    )
}

export default SubmitTransfer;