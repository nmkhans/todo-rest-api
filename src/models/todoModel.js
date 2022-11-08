const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "New",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }

}, { versionKey: false });

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
