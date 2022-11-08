const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const verifyUser = require("../middleWares/verifyUser");
const {
    registerUser,
    loginUser,
    updateUser,
} = require("../controllers/userController");
const {
    createTodo,
    getTodo,
    updateTodo,
    updateTodoStatus,
} = require("../controllers/todoController");

//? define router
const router = Router();

/* Application Routes */

//? default route
router.get("/", defaultController);

//? register a new user
router.post("/registerUser", registerUser);

//? login a user
router.post("/loginUser", loginUser);

//? update a user
router.put("/updateUser/:id", verifyUser, updateUser);

//? create a new todo
router.post("/createTodo", createTodo);

//? get todo
router.get("/getTodo", getTodo);

//? update a todo
router.put("/updateTodo/:id", updateTodo);

//? update a todo status
router.put("/updateTodoStatus/:id", updateTodoStatus);

module.exports = router;
