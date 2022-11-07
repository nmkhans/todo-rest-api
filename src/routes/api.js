const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const verifyUser = require("../middleWares/verifyUser");
const {
    registerUser,
    loginUser,
    updateUser,
} = require("../controllers/userController");

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

module.exports = router;
