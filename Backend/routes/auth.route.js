const express = require("express");
const { auth } = require("../controllers");
const app = express();

app.post("/register", auth.register);
app.post("/login",auth.login);

module.exports = app;
