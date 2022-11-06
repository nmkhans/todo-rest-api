const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./src/routes/api");


//? app configuration
const app = express();
app.use(cors());
app.use(bodyparser.json())

//? database connection
mongoose.connect("mongodb://localhost:27017/todo_rest_api")
.then(() => console.log("database connected"))
.catch(error => console.log(error))

//? handle routes
app.use('/api/v1', router);

//? handle undefined routes
app.use("*", (req, res) => {
    res.status(404).json({success: false, message: "Route not found"})
});

module.exports = app;