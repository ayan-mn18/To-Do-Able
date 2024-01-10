const express = require('express');
const morgan = require("morgan");
const bd = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bd.urlencoded({ extended: false }));
app.use(bd.json());


app.get("/api", (req, res) => {
  res.send("Api running on port 8000...")
});

app.listen(PORT, () => {
  console.log(colors.blue(`App running on PORT ${`${PORT}`}`));
});