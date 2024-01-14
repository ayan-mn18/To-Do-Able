//Importing Packages
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
});

userSchema.plugin(require("mongoose-bcrypt"));

const User = mongoose.model("User", userSchema);

module.exports = User;