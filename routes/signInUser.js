const { signin } = require("../controllers/user");

const signInUser = async(req, res) => {
    try {
        const {name, password} = req.body;
        const {user, token} = await signin({name, password});
        res.json({user, token});
    } catch (error) {
        console.log(error);
        res.status(403).json(error);
    }
};

module.exports = signInUser;
