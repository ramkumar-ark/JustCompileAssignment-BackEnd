const { verifyToken } = require("../controllers/user");

const verify = async (req, res) => {
    try {
        const { token } = req.body;
        console.log('API Verification request received.')
        await verifyToken(token);
        res.json({status: true});
    } catch (error) {
        res.status(403).json(error);
    }
};

module.exports = verify;