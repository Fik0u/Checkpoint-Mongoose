const mongoose = require('mongoose')

// Function to make link between Mongoose and the Database
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to DB 🌍");
    } catch (error) {
        console.log("Couldn't connect to DB 👾", error);
    }
}

module.exports = connectDB;