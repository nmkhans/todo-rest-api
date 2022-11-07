const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authheader;
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Unauthorised Access",
            });
        } 

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decoded) {
            req.decoded = decoded;
            next();
        }

    } catch (error) {
        res.status(403).json({
            status: false,
            message: "Forbidden Access",
            error: error,
        });
    }
};

module.exports = verifyUser;
