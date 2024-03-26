const express = require("express");
const chats = require("./Dummy/data");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandle");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/", routes);

app.use(errorHandler);

//get chat list
// app.get("/chat", (req, res) => {
//   res.json(chats);
// });

// //get single chat detail
// app.get("/chat/:id", (req, res) => {
//   const singleChat = chats.find((data) => data["_id"] == req.params.id);
//   res.json(singleChat);
// });

module.exports = app;
