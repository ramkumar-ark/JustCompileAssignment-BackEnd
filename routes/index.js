const { Router } = require("express");
const signupUser = require("./signUpUser");
const signInUser = require("./signInUser");
const verify = require("./verify");
const protectApi = require("../utils/protectApi");
const addNewNote = require("./addNewNote");
const fetchAllNotes = require("./fetchAllNotesOfUser");

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signInUser);
router.post("/verify/secret", verify);
router.post("/addnewnote", protectApi, addNewNote);
router.get("/getallnotes/:name", protectApi, fetchAllNotes);

module.exports = router;
