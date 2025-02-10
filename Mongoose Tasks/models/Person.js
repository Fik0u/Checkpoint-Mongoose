const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    favoriteFood: [String],

})

const Person = mongoose.model("person", personSchema)

module.exports = Person;