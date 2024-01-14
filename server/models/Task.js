//Importing Packages
const { default: mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    originalContent: { type: String, required: true },
    index: { type: Number, required: true },
    columnId: { type: mongoose.SchemaTypes.ObjectId, ref: "Column", required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;