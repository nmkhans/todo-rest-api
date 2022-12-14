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

//? get todo
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

//? update todo
const updateTodo = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const updatedDoc = {
            $set: {
                ...data,
            },
        };
        const result = await todoModel.updateOne({ _id: id }, updatedDoc, {
            upsert: true,
        });

        res.status(200).json({
            success: true,
            message: "Update successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: error,
        });
    }
};

//? update todo status
const updateTodoStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const updatedDoc = {
            $set: {
                status,
            },
        };
        const result = await todoModel.updateOne({ _id: id }, updatedDoc, {
            upsert: true,
        });

        res.status(200).json({
            success: true,
            message: "status updated",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Status update failed",
            error: error,
        });
    }
};

//? filter todo by status
const filterByStatus = async (req, res) => {
    try {
        const { email, status } = req.query;
        const result = await todoModel.find({ email: email, status: status });

        res.status(200).json({
            success: true,
            message: "filter result",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side error",
            error: error
        })
    }
};

module.exports = {
    createTodo,
    getTodo,
    updateTodo,
    updateTodoStatus,
    filterByStatus,
};
