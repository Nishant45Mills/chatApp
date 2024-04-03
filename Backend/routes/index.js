const express = require("express");
const app = express();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const chatRoute = require("./chat.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
];

routes.forEach((data) => {
  app.use(data.path, data.route);
});

module.exports = app;
