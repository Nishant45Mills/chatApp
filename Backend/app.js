const express = require("express");
const chats = require("./Dummy/data");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandle");
require("dotenv").config();
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cookieParser());

app.use(cors());

app.use(bodyParser.json());

app.use("/", routes);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
});

module.exports = server;
