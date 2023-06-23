const { signup } = require("../controllers/user");

const signupUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const {user, token} = await signup({name, email, password});
        res.json({user, token});
    } catch (error) {
        console.log(error);
        let errMsg = "";
        switch (error.error.code) {
            case 11000:
                errMsg = "Email Id or username has already been registered!";
                break;
            default:
                errMsg = "System Error. Contact Support.";
                break;
        }
        res.status(403).json({error: errMsg});
    }
}

module.exports = signupUser;