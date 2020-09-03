const mongoose = require("mongoose");

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log("Connected to the database");
        
    } catch (error) {
        console.log("Failed to connect to MongoDB");
        console.log(error)
        
    }
}

module.exports = connectDB;