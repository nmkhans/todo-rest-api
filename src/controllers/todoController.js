const todoModel = require("../models/todoModel");

//? create a new todo
const createTodo = async (req, res) => {
    try {
        const data = req.body;
        const result = await todoModel.create(data);

        res.status(200).json({
            success: true,
            message: "New Todo added",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create new Todo",
            data: error,
        });
    }
};

//? read todo
const getTodo = async (req, res) => {
    try {
        const { email } = req.query;
        const todos = await todoModel.find({ email: email });

        res.status(200).json({
            success: true,
            message: "All Todos",
            data: todos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side problem",
            error: error,
        });
    }
};

module.exports = {
    createTodo,
    getTodo,
};
