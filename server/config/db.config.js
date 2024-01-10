const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");


dotenv.config();
const { MONGOURL: URL } = process.env;

const dbConnection = () => {
    mongoose.set("strictQuery", false);
    //MongoDB Connection
    mongoose
        .connect(URL)
        .then(() => {
            console.log(colors.bold.blue("Successfully connect to MongoDB."));
        })
        .catch((err) => {
            console.error(colors.red("DB Connection error"), err);
            process.exit();
        });
}

module.exports = {
    dbConnection,
}