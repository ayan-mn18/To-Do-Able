const express = require("express");
const User = require("../models/User");

const responseMaker = require("../services/responseMaker");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        let { userName, emailId, password } = req.body;
        const newUser = await User.create({
            userName, emailId, password
        });
        if (!newUser) {
            res.status(500).json(responseMaker("Error While creating new User!", {}, false));
        } else {
            res.status(200).json(responseMaker("Welcome to Kanban To-Do-Able!", newUser, true));
        }
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        console.log(user)

        if (!user) {
            res.status(500).json(responseMaker("User Doesn't Exist", { emailId }, false));
        }

        const validPwd = user.verifyPasswordSync(password);

        if (!validPwd) {
            res.status(500).json(responseMaker("Incorrect Password", { emailId }, false));
        }

        res.status(200).json(responseMaker("Logged in successfully!", { emailId }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

module.exports = router;