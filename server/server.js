const express = require('express');
const morgan = require("morgan");
const bd = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnection } = require("./config/db.config");

dotenv.config();
const { PORT } = process.env;

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bd.urlencoded({ extended: false }));
app.use(bd.json());

dbConnection();

app.get("/api", (req, res) => {
  res.send("Api running on port 8000...")
});

app.listen(PORT, () => {
  console.log(colors.bold.yellow(`App running on PORT ${`${PORT}`}`));
});