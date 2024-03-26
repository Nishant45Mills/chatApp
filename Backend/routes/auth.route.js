const express = require("express");
const { signUp, auth } = require("../controllers");
const app = express();

app.post("/register", auth.register);

module.exports = app;
