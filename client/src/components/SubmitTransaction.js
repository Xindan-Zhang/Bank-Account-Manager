import React from 'react'

export const SubmitTransaction = () => {

    return (
        <div>
            <h3>Submission Successful</h3>
            <p>You have added ${sessionStorage.getItem("amount")} to your {sessionStorage.getItem("account")}</p>
        </div>
    )
}
