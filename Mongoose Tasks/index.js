// Express require to make our routes and server
const express = require("express")
const app = express()

require("dotenv").config()

// Connection to the Database
const connectDB = require("./config/connectDB")
connectDB()


// Importing the model
const Person = require("./models/Person")

//First document
const newPerson = {
    name: "John",
    age: 25,
    favoriteFood: ["Pizza", "Pasta"]
}

//! CRUD OPERATIONS
// I - Creation:
async function createPerson(newP){
    try {
        const nouvelleP = new Person(newP)
        await nouvelleP.save()
        console.log("Person added successfully", nouvelleP)
    } catch (error) {
        console.log("Couldn't add person", error)
    }
}
// createPerson(newPerson)

const arrayofPeople = [
    { name: "Ahmed", age: 30, favoriteFood: ["Couscous", "Salad"]},
    { name: "Leila", age: 25, favoriteFood: ["Burger", "Pasta"]},
    { name: "Sirine", age: 35, favoriteFood: ["Sushi", "Chorba"]}
]

async function createPeople(array){
    try {
        const people = await Person.insertMany(array)
        console.log("People added successfully", people)
    } catch (error) {
        console.log("Couldn't add people", error)
    }
}
// createPeople(arrayofPeople)

// II - Read & Search:
async function findPeople(){
    try {
        const peopleList = await Person.find()
        console.log("List of people in the DB", peopleList);
    } catch (error) {
        console.log("Coudn't find people", error);
        
    }
}
// findPeople()

async function findOnePerson(name){
    try {
        const PersonName = await Person.findOne({name: name})
        console.log("Person with this name", PersonName);
    } catch (error) {
        console.log("Couldn't find person with this name", error);
    }
}
// findOnePerson("Sirine")

async function findOneID(id){
    try {
        const personID = await Person.findById(id)
        console.log("Person with this ID", personID);
    } catch (error) {
        console.log("Couldn't find person with this ID", error);
        
    }
}
// findOneID("67a7d7c3dfd9eff17f57d29d")

// III - Update:
async function UpdateAge(id, age){
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, {$set: {age: age}}, {new: true})
        console.log("Person updated successfully", updatedPerson);
    } catch (error) {
        console.log("Couldn't update person", error);
    }
}
// UpdateAge("67a7d47adafecfa61f724ba8", 40)

async function updateFood(id, food){
    try {
        const FoodUpdated = await Person.findByIdAndUpdate(id, {$push : {favoriteFood: food}}, {new: true})
        console.log("Food updated successfully", FoodUpdated);
    } catch (error) {
        console.log("Couldn't update food", error);
    }
}
// updateFood("67a7d7c3dfd9eff17f57d29f", "Chawarma")

// IV - Delete:
async function removePerson(id){
    try {
        const personRemoved = await Person.findByIdAndDelete(id)
        console.log("Person removed successfully", personRemoved);
    } catch (error) {
        console.log("Couldn't remove person", error);  
    }
}
// removePerson("67a7d7c3dfd9eff17f57d29e")

async function removeManyPeople(name){
    try {
        const peopleRemoved = await Person.findMany({name: name}).deleteMany()
        console.log("People removed successfully", peopleRemoved);
    } catch (error) {
        console.log("Couldn't remove people", error);    
    }
}
// This is a test function, it wasn't called.
// removeManyPeople([{name: "John"}, {name: "Ahmed"}])

//! AGREAGATION FUNCTIONS
async function queryChain(){
    try {
        const result = await Person.find({favoriteFood: "Pizza"})
            .sort({name: 1})
            .limit(2)
            .select("-age")
            .exec()
        console.log("Query chain result", result);
    } catch (error) {
        console.log("Couldn't find people with this query", error);
    }
}
// queryChain()


// Server 
PORT = process.env.PORT

app.listen(PORT, (err) => {
    err ? console.log(err)
        : console.log(`Server is running on port ${PORT}`)
})