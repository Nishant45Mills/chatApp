const express = require("express");
const chats = require("./Dummy/data");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandle");
require("dotenv").config();
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8100",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/", routes);

app.use(errorHandler);

module.exports = app;
