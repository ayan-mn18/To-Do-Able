const express = require("express");
const { User, Column } = require("../models");

const responseMaker = require("../services/responseMaker");

const router = express.Router();

router.post("/create", async (req, res) => {

    try {
        const { userId, name } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            res.status(500).json(responseMaker("Invalid UserID...", { userId }, false));
        }

        const index = (await Column.find({ userId: userId })).length;

        let newColumn = {
            userId,
            name,
            index
        }
        newColumn = await Column.create(newColumn);

        if (!newColumn) {
            res.status(500).json(responseMaker("Error creating new Column", { userId, name, index }, false));
        }

        res.status(200).json(responseMaker("succesffuly created new column", { column: newColumn }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }

});

router.put("/update", async (req, res) => {
    try {
        const { columnId, name, columnState } = req.body;
        let column = await Column.findById(columnId);
        console.log("Column: ", column);
        if (!column) {
            res.status(500).json(responseMaker("Invalid ColumnID...", { columnId }, false));
        }

        if (name) {
            column.name = name;
            await column.save();
        }

        let userColumns = await Column.find({ userId: column.userId });
        let responseData = [];

        if (columnState.length === userColumns.length) {
            userColumns.forEach(async (userCol) => {
                let userColDB = await Column.findById(userCol._id);
                userColDB.index = columnState.find((col) => col.id === userCol.id).index;
                await userColDB.save();
                responseData.push(userColDB);
            })
            responseData = columnState ? responseData : column;
        }

        res.status(200).json(responseMaker("Column Updated successfully", { responseData }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

router.delete("/delete");

router.get("/all");

router.get("/")

module.exports = router;