const Transaction = require('./Model/BankTransaction');


// Return all transactions
async function getTransactions(req, res, next) {
    try {
        const transactions = await Transaction.find();
        res.status(200);
        res.json({
            success: true,
            data: transactions,
        })

    } catch (error) {
        res.status(500);
        res.json({
            success: false,
            error: "Failed to get transactions",
        })
    }
}


// Add a new transaction
async function addTransaction(req, res, next) {
    try {
        const newTransaction = await Transaction.create(req.body);

        res.status(201);
        res.json({
            success: true,
            data: newTransaction,
        })

    } catch (error) {
        res.status(500);
        res.json({
            success: false,
            error: "Failed to add transaction",
        }) 
    }
}


// Delete a transaction based on ID
async function deleteTransaction(req, res, next) {
    try {
        const id = req.params.id; // get id from url
        const transaction = await Transaction.findById(id);

        if (transaction == null) {
            res.status(404); // transaction not found
            res.json({
                sucess: false,
                error: "transaction does not exist"
            })

        } else {
            transaction.remove();
            res.status(200);
            res.json({
                success: true,
                data : {},
            })
        }
        
    } catch (error) {
        res.status(500);
        res.json({
            success: false,
            error: "failed to delete transaction"
        })
        
    }
}



module.exports = {getTransactions, addTransaction, deleteTransaction};