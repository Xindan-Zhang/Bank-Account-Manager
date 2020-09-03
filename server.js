const express = require("express");
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const path = require("path")

const app = express();

app.use(express.json());

dotenv.config({path: "./config/config.env"});

connectDB(); // connect to database

app.use('/api/transactions', require("./routes"))
app.use('/api/auto', require('./auto_transfer/routes'));


// if (process.env.NODE_ENV === 'production') {   // uncomment this when deploy to heroku

    app.use(express.static('client/build'))
    app.get("*", (req, res) => { // map all other routes to index.html from the client folder
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
// }

 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log("Server running ..."));

