const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//? register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const userExist = await userModel.findOne(
            { email: email }, { email: 1 }
        );

        if (!userExist) {
            if (password === confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const userData = {
                    name,
                    email,
                    password: hashedPassword
                };
                const result = await userModel.create(userData);
                res.status(200).json({
                    success: true,
                    message: "user register successfull",
                    data: result
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Please check the information and resubmit",
                });
            }
        } else {
            return res.status(500).json({
                success: false,
                message: "User Already Exist",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user register failed",
            data: error
        });
    }
}

//? login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        const matchUser = await bcrypt.compare(password, user.password);

        if (matchUser) {
            const userData = await userModel.findOne({ email: email }, { password: 0 });
            const token = jwt.sign({email: userData.email}, process.env.TOKEN_SECRET, {
                "expiresIn": "1d"
            });

            res.status(200).json({
                success: true,
                message: "Login successfull",
                data: userData,
                token: token
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Please provide valid information"
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "user login failed",
            data: error
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}