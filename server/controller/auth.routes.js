const express = require("express");
const User = require("../models/User");

const responseMaker = require("../services/responseMaker");
const { Column, Task } = require("../models");
const loadDummyData = require("../services/loadDummyData");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        let { userName, emailId, password } = req.body;
        const newUser = await User.create({
            userName, emailId, password
        });
        if (!newUser) {
            res.status(500).json(responseMaker("Error While creating new User!", {}, false));
        }

        await loadDummyData(newUser.id);

        res.status(200).json(responseMaker("Welcome to Kanban To-Do-Able!", newUser, true));

    } catch (error) {
        res.status(203).json(responseMaker(error.message, {}, false));
    }
});

router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        let user = await User.findOne({ emailId });

        if (!user) {
            res.status(500).json(responseMaker("User Doesn't Exist", { emailId }, false));
            return;
        }

        const validPwd = user.verifyPasswordSync(password);

        if (!validPwd) {
            res.status(500).json(responseMaker("Incorrect Password", { emailId }, false));
            return;
        }

        let loginDetails = {
            "user": {},
            "columns": {},
            "tasks": {}
        };

        const columns = (await Column.find({ userId: user._id })).sort((a, b) => a.index - b.index);

        let tasks = [];
        await Promise.all(columns.map(async (col) => {
            let task = await Task.find({ columnId: col.id });
            tasks.push(...task);
        }));

        loginDetails.user = user;
        loginDetails.columns = columns;
        loginDetails.tasks = tasks;

        user.password = null;
        res.status(200).json(responseMaker("Logged in successfully!", { loginDetails }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

module.exports = router;