const defaultController = (req, res) => {
    res.send({message: "server is running"});
}

module.exports = defaultController;