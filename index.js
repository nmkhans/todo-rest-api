const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;

//? listening to port
app.listen(port, () => {
    console.log("listening to port", port)
})