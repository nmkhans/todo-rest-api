const getTodos = async (req, res) => {
    const decodedEmail = req.decoded.email;
    const { email } = req.query;
    if(decodedEmail === email) {

        console.log("inside get todos");
    }
};

module.exports = {
    getTodos,
};
