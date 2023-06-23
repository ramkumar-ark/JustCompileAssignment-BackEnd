const { fetchNotes } = require("../controllers/user");

const fetchAllNotes = async(req, res) => {
    try {
        const {name} = req.params;
        const result = await fetchNotes(name);
        res.json({result});
    } catch (error) {
        console.log(error);
        res.status(403).json(error);
    }
};

module.exports = fetchAllNotes;
