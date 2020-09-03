const express = require("express");
const router = express.Router();
const schedule = require("node-schedule-tz")
const Transaction = require('../Model/BankTransaction');


// Use node schedule to handle auto transfer post requests
function postAutoTransaction(req, res, next) {
    const year = req.body.year;
    const month = req.body.month - 1;
    const day = req.body.day;
    const hour = req.body.hour;
    const minute = req.body.minute;

    const date = new Date(year, month, day, hour, minute, 0);

        const task = schedule.scheduleJob(date, async () => {
            try {
                 const newTransaction = await Transaction.create(req.body);
                 
            } catch (err) {
                console.log("ERROR in post auto transaction");
            }
        })

        res.status(201);
        res.json({
            success: true
        })
}

router.route('/').post(postAutoTransaction);

module.exports = router;