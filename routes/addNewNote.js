const { addNote } = require("../controllers/user");

const addNewNote = async(req, res) => {
    try {
        const {name, note} = req.body;
        const result = await addNote(note, name);
        res.json({result});
    } catch (error) {
        console.log(error);
        res.status(403).json({message: error});
    }
};

module.exports = addNewNote;
