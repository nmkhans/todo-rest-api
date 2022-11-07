const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const { getTodos } = require("../controllers/todoController");
const { registerUser,
        loginUser
} = require("../controllers/userController");
const verifyUser = require("../middleWares/verifyUser");

//? define router
const router = Router();

/* Application Routes */

//? default route
router.get("/", defaultController);

//? register a new user
router.post("/registerUser", registerUser);

//? login a user
router.post("/loginUser", loginUser)

router.get("/getTodos", verifyUser, getTodos);

module.exports = router;