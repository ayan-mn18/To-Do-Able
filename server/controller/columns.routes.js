const express = require("express");
const { User, Column, Task } = require("../models");

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
        if (!column) {
            res.status(500).json(responseMaker("Invalid ColumnID...", { columnId }, false));
        }

        if (name) {
            column.name = name;
            await column.save();
        }

        let userColumns = await Column.find({ userId: column.userId });

        if (columnState.length === userColumns.length) {
            await Promise.all(userColumns.map(async (userCol) => {
                let userColDB = await Column.findById(userCol._id);
                userColDB.index = columnState.find((col) => col.id === userCol.id).index;
                await userColDB.save();
            }));
            userColumns = await Column.find({ userId: column.userId });
        }

        res.status(200).json(responseMaker("Column Updated successfully", { userColumns, column }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

// Delete column with its tasks
router.delete("/", async (req, res) => {
    try {
        const { columnId } = req.body;
        let column = await Column.findById(columnId);
        if (!column) {
            res.status(500).json(responseMaker("Invalid ColumnID...", { columnId }, false));
            return;
        }
        let taskIdToBeDeleted = (await Task.find({ columnId: columnId })).map((t) => ({ id: t._id }));

        await Task.deleteMany({ $or: taskIdToBeDeleted });

        await Column.deleteOne({ _id: columnId });

        res.status(200).json(responseMaker("Columns & it's respective Tasks deleted Successfully", {}, true));

    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }

});

//get single column with its task
router.get("/", async (req, res) => {
    try {
        const { columnId, task } = req.body;
        const column = await Column.findById(columnId);
        if (!column) {
            res.status(500).json(responseMaker("Invalid ColumnID...", { columnId }, false));
        }
        let response = { column: column, tasks: {} };
        if (task)
            response.tasks = await Task.find({ columnId: columnId });
        res.status(200).json(responseMaker("", response, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

module.exports = router;