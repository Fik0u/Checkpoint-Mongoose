const mongoose = require("mongoose")

// Blueprint to our documents
const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    favoriteFood: [String],

})

// Model that will serve to create the documents
const Person = mongoose.model("person", personSchema)

module.exports = Person;