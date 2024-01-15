const express = require("express");
const { User, Column, Task } = require("../models");

const responseMaker = require("../services/responseMaker");
const { find } = require("../models/User");

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { columnId, content } = req.body;
        const column = await Column.findById(columnId);
        if (!column) {
            res.status(500).json(responseMaker("Invalid ColumnId", { columnId }, false));
        }
        const tasks = await Task.find({ columnId: columnId });
        let newTask = {
            content,
            originalContent: content,
            columnId,
            userId: column.userId,
            index: tasks.length
        }
        newTask = await Task.create(newTask);
        if (!newTask) {
            res.status(500).json(responseMaker("Error Creating new task", { newTask }, false));
        }

        res.status(200).json(responseMaker("New task created", { newTask }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

router.put("/update", async (req, res) => {
    try {
        const { content, taskId, tasksState } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            res.status(500).json(responseMaker("Invalid TaskId ", { taskId }, false));
            return;
        }

        if (content) {
            task.content = content;
            await task.save();
        }

        let tasks = await Task.find({ columnId: task.columnId });

        if (tasksState && tasksState.length === tasks.length) {
            await Promise.all(tasks.map(async (t) => {
                let taskDB = await Task.findById(t.id);
                taskDB.index = tasksState.find((taskState) => taskState.id === t.id).index;
                await taskDB.save();
            }));
            tasks = await Task.find({ columnId: task.columnId });
        }
        res.status(200).json(responseMaker("Task Updated successfully", { tasks, task }, true));

    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

//get single task
router.get("/", async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(500).json(responseMaker("Invalid TaskId ", { taskId }, false));
            return;
        }

        res.status(200).json(responseMaker("", { task }, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

//delete single task
router.delete("/", async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(500).json(responseMaker("Invalid TaskId ", { taskId }, false));
            return;
        }

        await Task.deleteOne({ _id: taskId });
        res.status(200).json(responseMaker("Task deleted Successfully", {}, true));
    } catch (error) {
        res.status(500).json(responseMaker(error.message, {}, false));
    }
});

module.exports = router;