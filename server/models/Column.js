//Importing Packages
const { default: mongoose } = require("mongoose");

const ColumnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    index: { type: Number, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }
});

const Column = mongoose.model("Column", ColumnSchema);

module.exports = Column;